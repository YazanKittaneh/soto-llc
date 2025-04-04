export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string | null;
          email: string;
          is_admin: boolean;
          full_name?: string | null;
          avatar_url?: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string | null;
          email: string;
          is_admin?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string | null;
          email?: string;
          is_admin?: boolean;
        };
      };

      tasks: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string | null;
          title: string;
          description: string | null;
          is_complete: boolean;
          user_id: string;
          due_date: string | null;
          priority: 'low' | 'medium' | 'high' | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string | null;
          title: string;
          description?: string | null;
          is_complete?: boolean;
          user_id: string;
          due_date?: string | null;
          priority?: 'low' | 'medium' | 'high' | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string | null;
          title?: string;
          description?: string | null;
          is_complete?: boolean;
          user_id?: string;
          due_date?: string | null;
          priority?: 'low' | 'medium' | 'high' | null;
        };
      },

      business_formations: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string | null;
          entity_name: string;
          entity_address: string;
          service_product_offered: string;
          entity_type: 'LLC' | 'S-CORP' | 'C-CORP';
          expedite: 'YES' | 'NO';
          owners: Json;
          signatures: Json | null;
          user_id: string;
          status: 'pending' | 'processing' | 'completed' | 'rejected';
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string | null;
          entity_name: string;
          entity_address: string;
          service_product_offered: string;
          entity_type: 'LLC' | 'S-CORP' | 'C-CORP';
          expedite: 'YES' | 'NO';
          owners: Json;
          signatures?: Json | null;
          user_id: string;
          status?: 'pending' | 'processing' | 'completed' | 'rejected';
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string | null;
          entity_name?: string;
          entity_address?: string;
          service_product_offered?: string;
          entity_type?: 'LLC' | 'S-CORP' | 'C-CORP';
          expedite?: 'YES' | 'NO';
          owners?: Json;
          signatures?: Json | null;
          user_id?: string;
          status?: 'pending' | 'processing' | 'completed' | 'rejected';
        };
      }
      Row: {
        id: string;
        created_at: string;
        updated_at: string | null;
        title: string;
        description: string | null;
        is_complete: boolean;
        user_id: string;
        due_date: string | null;
        priority: 'low' | 'medium' | 'high' | null;
      };
      Insert: {
        id?: string;
        created_at?: string;
        updated_at?: string | null;
        title: string;
        description?: string | null;
        is_complete?: boolean;
        user_id: string;
        due_date?: string | null;
        priority?: 'low' | 'medium' | 'high' | null;
      };
      Update: {
        id?: string;
        created_at?: string;
        updated_at?: string | null;
        title?: string;
        description?: string | null;
        is_complete?: boolean;
        user_id?: string;
        due_date?: string | null;
        priority?: 'low' | 'medium' | 'high' | null;
      };
    };
  };

  Views: {
    [_ in never]: never;
  };

  Functions: {
    [_ in never]: never;
  };
};

export type Tables = Database['public']['Tables']['business_formations']['Row'];

export type InsertTables = Database['public']['Tables']['business_formations']['Insert'];

export type UpdateTables = Database['public']['Tables']['business_formations']['Update'];

// Auth types
export type UserMetadata = {
  name?: string;
  avatar_url?: string;
};

export interface UserProfile extends Tables {
  auth_user?: {
    email: string;
  };
} 
