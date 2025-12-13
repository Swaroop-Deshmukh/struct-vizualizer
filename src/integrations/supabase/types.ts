export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      driver_earnings: {
        Row: {
          bonus: number | null
          created_at: string | null
          driver_id: string
          id: string
          net_earnings: number
          platform_fee: number
          ride_id: string
          total_collected: number
        }
        Insert: {
          bonus?: number | null
          created_at?: string | null
          driver_id: string
          id?: string
          net_earnings: number
          platform_fee: number
          ride_id: string
          total_collected: number
        }
        Update: {
          bonus?: number | null
          created_at?: string | null
          driver_id?: string
          id?: string
          net_earnings?: number
          platform_fee?: number
          ride_id?: string
          total_collected?: number
        }
        Relationships: [
          {
            foreignKeyName: "driver_earnings_ride_id_fkey"
            columns: ["ride_id"]
            isOneToOne: false
            referencedRelation: "rides"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          eco_credits: number | null
          full_name: string
          government_id_verified: boolean | null
          id: string
          phone: string | null
          rating: number | null
          total_carbon_saved: number | null
          total_distance_shared: number | null
          total_rides: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          eco_credits?: number | null
          full_name: string
          government_id_verified?: boolean | null
          id?: string
          phone?: string | null
          rating?: number | null
          total_carbon_saved?: number | null
          total_distance_shared?: number | null
          total_rides?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          eco_credits?: number | null
          full_name?: string
          government_id_verified?: boolean | null
          id?: string
          phone?: string | null
          rating?: number | null
          total_carbon_saved?: number | null
          total_distance_shared?: number | null
          total_rides?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      ride_passengers: {
        Row: {
          approved_by_captain: boolean | null
          approved_by_driver: boolean | null
          carbon_saved: number | null
          dropoff_address: string
          dropoff_lat: number
          dropoff_lng: number
          final_fare: number | null
          id: string
          is_captain: boolean | null
          joined_at: string | null
          original_fare: number
          passenger_id: string
          pickup_address: string
          pickup_lat: number
          pickup_lng: number
          ride_id: string
          status: string | null
          wallet_cashback: number | null
        }
        Insert: {
          approved_by_captain?: boolean | null
          approved_by_driver?: boolean | null
          carbon_saved?: number | null
          dropoff_address: string
          dropoff_lat: number
          dropoff_lng: number
          final_fare?: number | null
          id?: string
          is_captain?: boolean | null
          joined_at?: string | null
          original_fare: number
          passenger_id: string
          pickup_address: string
          pickup_lat: number
          pickup_lng: number
          ride_id: string
          status?: string | null
          wallet_cashback?: number | null
        }
        Update: {
          approved_by_captain?: boolean | null
          approved_by_driver?: boolean | null
          carbon_saved?: number | null
          dropoff_address?: string
          dropoff_lat?: number
          dropoff_lng?: number
          final_fare?: number | null
          id?: string
          is_captain?: boolean | null
          joined_at?: string | null
          original_fare?: number
          passenger_id?: string
          pickup_address?: string
          pickup_lat?: number
          pickup_lng?: number
          ride_id?: string
          status?: string | null
          wallet_cashback?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ride_passengers_ride_id_fkey"
            columns: ["ride_id"]
            isOneToOne: false
            referencedRelation: "rides"
            referencedColumns: ["id"]
          },
        ]
      }
      rides: {
        Row: {
          actual_end_time: string | null
          actual_start_time: string | null
          base_fare: number
          created_at: string | null
          distance_km: number | null
          driver_id: string | null
          dropoff_address: string
          dropoff_lat: number
          dropoff_lng: number
          estimated_duration_mins: number | null
          id: string
          is_sharing_enabled: boolean | null
          max_passengers: number | null
          pickup_address: string
          pickup_lat: number
          pickup_lng: number
          status: Database["public"]["Enums"]["ride_status"] | null
          updated_at: string | null
          vehicle_id: string | null
        }
        Insert: {
          actual_end_time?: string | null
          actual_start_time?: string | null
          base_fare: number
          created_at?: string | null
          distance_km?: number | null
          driver_id?: string | null
          dropoff_address: string
          dropoff_lat: number
          dropoff_lng: number
          estimated_duration_mins?: number | null
          id?: string
          is_sharing_enabled?: boolean | null
          max_passengers?: number | null
          pickup_address: string
          pickup_lat: number
          pickup_lng: number
          status?: Database["public"]["Enums"]["ride_status"] | null
          updated_at?: string | null
          vehicle_id?: string | null
        }
        Update: {
          actual_end_time?: string | null
          actual_start_time?: string | null
          base_fare?: number
          created_at?: string | null
          distance_km?: number | null
          driver_id?: string | null
          dropoff_address?: string
          dropoff_lat?: number
          dropoff_lng?: number
          estimated_duration_mins?: number | null
          id?: string
          is_sharing_enabled?: boolean | null
          max_passengers?: number | null
          pickup_address?: string
          pickup_lat?: number
          pickup_lng?: number
          status?: Database["public"]["Enums"]["ride_status"] | null
          updated_at?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rides_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          color: string
          created_at: string | null
          driver_id: string
          id: string
          is_active: boolean | null
          license_plate: string
          make: string
          model: string
          seats_available: number | null
          vehicle_type: Database["public"]["Enums"]["vehicle_type"]
          year: number
        }
        Insert: {
          color: string
          created_at?: string | null
          driver_id: string
          id?: string
          is_active?: boolean | null
          license_plate: string
          make: string
          model: string
          seats_available?: number | null
          vehicle_type: Database["public"]["Enums"]["vehicle_type"]
          year: number
        }
        Update: {
          color?: string
          created_at?: string | null
          driver_id?: string
          id?: string
          is_active?: boolean | null
          license_plate?: string
          make?: string
          model?: string
          seats_available?: number | null
          vehicle_type?: Database["public"]["Enums"]["vehicle_type"]
          year?: number
        }
        Relationships: []
      }
      wallet_transactions: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          id: string
          ride_id: string | null
          transaction_type: string
          wallet_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          id?: string
          ride_id?: string | null
          transaction_type: string
          wallet_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          id?: string
          ride_id?: string | null
          transaction_type?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_ride_id_fkey"
            columns: ["ride_id"]
            isOneToOne: false
            referencedRelation: "rides"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wallet_transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          balance: number | null
          created_at: string | null
          eco_credits: number | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          balance?: number | null
          created_at?: string | null
          eco_credits?: number | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          balance?: number | null
          created_at?: string | null
          eco_credits?: number | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "driver" | "passenger"
      ride_status:
        | "searching"
        | "confirmed"
        | "in_progress"
        | "completed"
        | "cancelled"
      vehicle_type: "hatchback" | "sedan" | "suv"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "driver", "passenger"],
      ride_status: [
        "searching",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
      ],
      vehicle_type: ["hatchback", "sedan", "suv"],
    },
  },
} as const
