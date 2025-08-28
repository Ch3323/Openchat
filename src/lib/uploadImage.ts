import { supabase } from './client';

export async function uploadImage(file: File) {
  const filePath = `chat/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage.from('chat-images').upload(filePath, file);

  if (error) {
    console.error('Upload error:', error.message);
    throw error;
  }

  const { data: publicUrlData } = supabase.storage.from('chat-images').getPublicUrl(filePath);

  console.log(publicUrlData.publicUrl);
  return publicUrlData.publicUrl;
}
