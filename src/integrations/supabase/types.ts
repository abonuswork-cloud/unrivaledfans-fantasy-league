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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      draft_picks: {
        Row: {
          auto_pick: boolean
          created_at: string
          id: string
          league_id: string
          pick_no: number
          player_id: string
          team_id: string
        }
        Insert: {
          auto_pick?: boolean
          created_at?: string
          id?: string
          league_id: string
          pick_no: number
          player_id: string
          team_id: string
        }
        Update: {
          auto_pick?: boolean
          created_at?: string
          id?: string
          league_id?: string
          pick_no?: number
          player_id?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "draft_picks_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "draft_picks_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "draft_picks_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      draft_queue: {
        Row: {
          created_at: string
          id: string
          league_id: string
          player_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          league_id: string
          player_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          league_id?: string
          player_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "draft_queue_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "draft_queue_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      game_boxscores: {
        Row: {
          ast: number
          blk: number
          game_date: string
          id: string
          league_id: string
          player_id: string
          pts: number
          reb: number
          stl: number
          turnovers: number
        }
        Insert: {
          ast: number
          blk: number
          game_date: string
          id?: string
          league_id: string
          player_id: string
          pts: number
          reb: number
          stl: number
          turnovers: number
        }
        Update: {
          ast?: number
          blk?: number
          game_date?: string
          id?: string
          league_id?: string
          player_id?: string
          pts?: number
          reb?: number
          stl?: number
          turnovers?: number
        }
        Relationships: [
          {
            foreignKeyName: "game_boxscores_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_boxscores_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      league_activity: {
        Row: {
          created_at: string
          id: string
          league_id: string
          message: string
        }
        Insert: {
          created_at?: string
          id?: string
          league_id: string
          message: string
        }
        Update: {
          created_at?: string
          id?: string
          league_id?: string
          message?: string
        }
        Relationships: [
          {
            foreignKeyName: "league_activity_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
        ]
      }
      league_roles: {
        Row: {
          league_id: string
          role: string
          user_id: string
        }
        Insert: {
          league_id: string
          role: string
          user_id: string
        }
        Update: {
          league_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "league_roles_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
        ]
      }
      leagues: {
        Row: {
          created_at: string
          current_pick: number
          draft_status: string
          id: string
          invite_code: string
          is_demo: boolean
          lock_at: string | null
          max_teams: number
          name: string
          owner_id: string | null
          pick_deadline: string | null
          pick_seconds: number
          scoring: Json
        }
        Insert: {
          created_at?: string
          current_pick?: number
          draft_status?: string
          id?: string
          invite_code?: string
          is_demo?: boolean
          lock_at?: string | null
          max_teams?: number
          name: string
          owner_id?: string | null
          pick_deadline?: string | null
          pick_seconds?: number
          scoring?: Json
        }
        Update: {
          created_at?: string
          current_pick?: number
          draft_status?: string
          id?: string
          invite_code?: string
          is_demo?: boolean
          lock_at?: string | null
          max_teams?: number
          name?: string
          owner_id?: string | null
          pick_deadline?: string | null
          pick_seconds?: number
          scoring?: Json
        }
        Relationships: []
      }
      players: {
        Row: {
          ast: number
          blk: number
          club_id: string | null
          gp: number
          id: string
          name: string
          position: string
          pts: number
          reb: number
          season: number
          source_url: string
          stl: number
          turnovers: number
          updated_at: string
        }
        Insert: {
          ast?: number
          blk?: number
          club_id?: string | null
          gp?: number
          id?: string
          name: string
          position: string
          pts?: number
          reb?: number
          season?: number
          source_url: string
          stl?: number
          turnovers?: number
          updated_at?: string
        }
        Update: {
          ast?: number
          blk?: number
          club_id?: string | null
          gp?: number
          id?: string
          name?: string
          position?: string
          pts?: number
          reb?: number
          season?: number
          source_url?: string
          stl?: number
          turnovers?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "players_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "unrivaled_clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          display_name: string
          id: string
        }
        Insert: {
          avatar_url?: string | null
          display_name?: string
          id: string
        }
        Update: {
          avatar_url?: string | null
          display_name?: string
          id?: string
        }
        Relationships: []
      }
      roster_slots: {
        Row: {
          id: string
          league_id: string
          player_id: string | null
          projection: number | null
          slot: number
          team_id: string
        }
        Insert: {
          id?: string
          league_id: string
          player_id?: string | null
          projection?: number | null
          slot: number
          team_id: string
        }
        Update: {
          id?: string
          league_id?: string
          player_id?: string | null
          projection?: number | null
          slot?: number
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "roster_slots_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roster_slots_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roster_slots_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      stats_sync: {
        Row: {
          error: string | null
          id: number
          last_attempt: string | null
          last_success: string | null
          lease_until: string | null
          status: string
        }
        Insert: {
          error?: string | null
          id?: number
          last_attempt?: string | null
          last_success?: string | null
          lease_until?: string | null
          status?: string
        }
        Update: {
          error?: string | null
          id?: number
          last_attempt?: string | null
          last_success?: string | null
          lease_until?: string | null
          status?: string
        }
        Relationships: []
      }
      teams: {
        Row: {
          draft_order: number
          id: string
          league_id: string
          losses: number
          name: string
          owner_id: string | null
          ties: number
          total_points: number
          wins: number
        }
        Insert: {
          draft_order: number
          id?: string
          league_id: string
          losses?: number
          name: string
          owner_id?: string | null
          ties?: number
          total_points?: number
          wins?: number
        }
        Update: {
          draft_order?: number
          id?: string
          league_id?: string
          losses?: number
          name?: string
          owner_id?: string | null
          ties?: number
          total_points?: number
          wins?: number
        }
        Relationships: [
          {
            foreignKeyName: "teams_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
        ]
      }
      unrivaled_clubs: {
        Row: {
          abbreviation: string
          id: string
          name: string
        }
        Insert: {
          abbreviation: string
          id: string
          name: string
        }
        Update: {
          abbreviation?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      weekly_results: {
        Row: {
          id: string
          league_id: string
          points: number
          team_id: string
          week_start: string
        }
        Insert: {
          id?: string
          league_id: string
          points: number
          team_id: string
          week_start: string
        }
        Update: {
          id?: string
          league_id?: string
          points?: number
          team_id?: string
          week_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "weekly_results_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "weekly_results_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_read_league: { Args: { lid: string }; Returns: boolean }
      claim_player: {
        Args: { drop_slot?: number; pid: string; tid: string }
        Returns: undefined
      }
      create_fantasy_league: {
        Args: { league_name: string; team_name: string }
        Returns: string
      }
      fantasy_draft: { Args: { lid: string; pid?: string }; Returns: undefined }
      finalize_fantasy_week: {
        Args: { lid: string; week_start: string }
        Returns: undefined
      }
      join_fantasy_league: {
        Args: { code: string; team_name: string }
        Returns: string
      }
      league_commissioner: { Args: { lid: string }; Returns: boolean }
      league_member: { Args: { lid: string }; Returns: boolean }
      record_fantasy_boxscore: {
        Args: { gdate: string; lid: string; pid: string; stats: Json }
        Returns: undefined
      }
      swap_lineup: {
        Args: { active_slot: number; bench_slot: number; tid: string }
        Returns: undefined
      }
      update_fantasy_settings: {
        Args: {
          league_name: string
          lid: string
          lock_time?: string
          score: Json
          seconds: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
