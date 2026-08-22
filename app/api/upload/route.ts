import { NextResponse } from 'next/server';
import { getAdminFromCookies } from '@/lib/auth';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import sharp from 'sharp';

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL ou Clé manquante dans les variables d\'environnement');
  }
  return createClient(supabaseUrl, supabaseKey);
}

export async function POST(request: Request) {
  const admin = await getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const supabase = getSupabaseClient();
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name) || '.png';

    let finalBuffer = buffer;
    let finalContentType = file.type || 'image/png';
    let finalExt = ext;

    // Convert to webp if it's an image
    if (finalContentType.startsWith('image/')) {
      try {
        finalBuffer = await sharp(buffer)
          .webp({ quality: 80 })
          .toBuffer();
        finalContentType = 'image/webp';
        finalExt = '.webp';
      } catch (err) {
        console.error('Error compressing image with sharp:', err);
        // Fallback to original buffer if sharp fails
      }
    }

    const safeBaseName = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');
    const filename = `${Date.now()}-${safeBaseName}${finalExt}`;

    // Upload to Supabase Storage
    const { error } = await supabase.storage
      .from('uploads')
      .upload(filename, finalBuffer, {
        contentType: finalContentType,
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw new Error(error.message);
    }

    // Get the public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from('uploads')
      .getPublicUrl(filename);

    return NextResponse.json({ url: publicUrlData.publicUrl, success: true });
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: error.message || "Erreur d'upload" }, { status: 500 });
  }
}
