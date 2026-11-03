import { createClient } from './client';

export const BILLS_BUCKET = 'bills';

/**
 * Uploads an electricity bill to the private 'bills' storage bucket under the user's isolated path.
 * File is restricted strictly to the user via Row Level Security storage policies.
 */
export async function uploadBillFile(file: File, userId: string): Promise<{ path: string; error: Error | null }> {
  try {
    const supabase = createClient();
    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `${userId}/${timestamp}-${cleanFileName}`;

    const { error: uploadError } = await supabase.storage
      .from(BILLS_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      return { path: '', error: uploadError };
    }

    return { path: filePath, error: null };
  } catch (err) {
    return { path: '', error: err as Error };
  }
}

/**
 * Ephemeral Storage Cleanup:
 * Deletes the raw bill file immediately after AI data extraction completes.
 * Strict compliance with ImVerde Privacy Rules (RULES.md).
 */
export async function deleteBillFile(filePath: string): Promise<{ success: boolean; error: Error | null }> {
  try {
    const supabase = createClient();
    const { error } = await supabase.storage.from(BILLS_BUCKET).remove([filePath]);

    if (error) {
      console.error('Failed to cleanup ephemeral bill file:', error.message);
      return { success: false, error };
    }

    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err as Error };
  }
}

/**
 * Generates a short-lived signed URL (60 seconds) strictly for Gemini AI multimodal reading
 * before the file is deleted.
 */
export async function getTemporaryBillUrl(filePath: string, expiresInSeconds = 60): Promise<string | null> {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from(BILLS_BUCKET)
    .createSignedUrl(filePath, expiresInSeconds);

  if (error || !data?.signedUrl) {
    return null;
  }

  return data.signedUrl;
}

