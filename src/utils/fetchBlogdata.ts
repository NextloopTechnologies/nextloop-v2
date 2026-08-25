import { BlogData } from '../types';
import supabaseClient from '../utils/client';

export async function fetchLatestBlogs(limit = 3): Promise<BlogData[]> {
  const { data, error } = await supabaseClient
    .from('blogs')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching blogs:', error.message);
    return [];
  }

  return data || [];
}
