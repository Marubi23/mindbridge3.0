// src/services/imageService.ts
import { supabase } from './supabase';

export interface ImageService {
  uploadImage(file: File, folder: 'home' | 'about'): Promise<string>;
  getImages(folder: 'home' | 'about'): Promise<string[]>;
  setActiveImage(folder: 'home' | 'about', imageUrl: string): Promise<void>;
  getActiveImage(folder: 'home' | 'about'): Promise<string | null>;
}

export const imageService: ImageService = {
  async uploadImage(file: File, folder: 'home' | 'about'): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('website-images')
        .upload(fileName, file);

      if (error) {
        throw new Error(`Upload failed: ${error.message}`);
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('website-images')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  async getImages(folder: 'home' | 'about'): Promise<string[]> {
    try {
      const { data, error } = await supabase.storage
        .from('website-images')
        .list(folder);

      if (error) {
        throw new Error(`Failed to get images: ${error.message}`);
      }

      if (!data) return [];

      const imageUrls = data.map(item => 
        supabase.storage
          .from('website-images')
          .getPublicUrl(`${folder}/${item.name}`).data.publicUrl
      );

      return imageUrls;
    } catch (error) {
      console.error('Error getting images:', error);
      return [];
    }
  },

  async setActiveImage(folder: 'home' | 'about', imageUrl: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('website_settings')
        .upsert({ 
          key: `active_${folder}_image`,
          value: imageUrl 
        });

      if (error) {
        throw new Error(`Failed to set active image: ${error.message}`);
      }
    } catch (error) {
      console.error('Error setting active image:', error);
      throw error;
    }
  },

  async getActiveImage(folder: 'home' | 'about'): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .select('value')
        .eq('key', `active_${folder}_image`)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        throw new Error(`Failed to get active image: ${error.message}`);
      }

      return data?.value || null;
    } catch (error) {
      console.error('Error getting active image:', error);
      return null;
    }
  }
};