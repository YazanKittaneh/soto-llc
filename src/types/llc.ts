import { Tables, InsertTables } from './supabase';
import { Json } from '@/types/common';

export type EntityType = 'LLC' | 'S-CORP' | 'C-CORP';
export type ExpediteOption = 'YES' | 'NO';

export interface BusinessOwner {
  fullName: string;
  address: string;
  phone: string;
  email: string;
  ssn?: string;
  dob?: string;
  responsibleParty?: boolean;
  ownerNumber: number;
}

export interface BusinessSignature {
  signHere: string;
  date: string;
  signerNumber: number;
}

export interface NewBusinessFormation {
  entityName: string;
  entityAddress: string;
  serviceProductOffered: string;
  entityType: EntityType;
  expedite: ExpediteOption;
  owners: BusinessOwner[];
  signatures?: BusinessSignature[];
  created_at?: string;
  updated_at?: string | null;
  user_id?: string;
  status?: 'pending' | 'processing' | 'completed' | 'rejected';
}

// For Supabase table types
export interface Database {
  public: {
    Tables: {
      business_formations: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string | null;
          entity_name: string;
          entity_address: string;
          service_product_offered: string;
          entity_type: EntityType;
          expedite: ExpediteOption;
          owners: BusinessOwner;
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
          entity_type: EntityType;
          expedite: ExpediteOption;
          owners: BusinessOwner;
          signatures?: Json | null;
          user_id?: string;
          status?: 'pending' | 'processing' | 'completed' | 'rejected';
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string | null;
          entity_name?: string;
          entity_address?: string;
          service_product_offered?: string;
          entity_type?: EntityType;
          expedite?: ExpediteOption;
          owners?: BusinessOwner;
          signatures?: Json | null;
          user_id?: string;
          status?: 'pending' | 'processing' | 'completed' | 'rejected';
        };
      };
    };
  };
}

export type BusinessFormation = Tables<'business_formations'>;
export type InsertBusinessFormation = InsertTables<'business_formations'>;
