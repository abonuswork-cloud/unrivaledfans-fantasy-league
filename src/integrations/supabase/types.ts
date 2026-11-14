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
      league_matchups: {
        Row: {
          away_team_id: string | null
          home_team_id: string
          id: string
          league_id: string
          week_no: number
          week_start: string
        }
        Insert: {
          away_team_id?: string | null
          home_team_id: string
          id?: string
          league_id: string
          week_no: number
          week_start: string
        }
        Update: {
          away_team_id?: string | null
          home_team_id?: string
          id?: string
          league_id?: string
          week_no?: number
          week_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "league_matchups_away_team_id_fkey"
            columns: ["away_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "league_matchups_home_team_id_fkey"
            columns: ["home_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "league_matchups_league_id_fkey"
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
          invitations_enabled: boolean
          invite_code: string
          is_demo: boolean
          lock_at: string | null
          max_teams: number
          name: string
          owner_id: string | null
          pick_deadline: string | null
          pick_seconds: number
          pickups_enabled: boolean
          scoring: Json
          season_start: string | null
          swaps_enabled: boolean
        }
        Insert: {
          created_at?: string
          current_pick?: number
          draft_status?: string
          id?: string
          invitations_enabled?: boolean
          invite_code?: string
          is_demo?: boolean
          lock_at?: string | null
          max_teams?: number
          name: string
          owner_id?: string | null
          pick_deadline?: string | null
          pick_seconds?: number
          pickups_enabled?: boolean
          scoring?: Json
          season_start?: string | null
          swaps_enabled?: boolean
        }
        Update: {
          created_at?: string
          current_pick?: number
          draft_status?: string
          id?: string
          invitations_enabled?: boolean
          invite_code?: string
          is_demo?: boolean
          lock_at?: string | null
          max_teams?: number
          name?: string
          owner_id?: string | null
          pick_deadline?: string | null
          pick_seconds?: number
          pickups_enabled?: boolean
          scoring?: Json
          season_start?: string | null
          swaps_enabled?: boolean
        }
        Relationships: []
      }
      official_game_days: {
        Row: {
          club_id: string
          game_date: string
        }
        Insert: {
          club_id: string
          game_date: string
        }
        Update: {
          club_id?: string
          game_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "official_game_days_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "unrivaled_clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      player_trades: {
        Row: {
          created_at: string
          from_team: string
          id: string
          league_id: string
          offered_player: string
          parent_trade: string | null
          requested_player: string
          status: string
          to_team: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          from_team: string
          id?: string
          league_id: string
          offered_player: string
          parent_trade?: string | null
          requested_player: string
          status?: string
          to_team: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          from_team?: string
          id?: string
          league_id?: string
          offered_player?: string
          parent_trade?: string | null
          requested_player?: string
          status?: string
          to_team?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_trades_from_team_fkey"
            columns: ["from_team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_trades_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_trades_offered_player_fkey"
            columns: ["offered_player"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_trades_parent_trade_fkey"
            columns: ["parent_trade"]
            isOneToOne: false
            referencedRelation: "player_trades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_trades_requested_player_fkey"
            columns: ["requested_player"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_trades_to_team_fkey"
            columns: ["to_team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      player_waivers: {
        Row: {
          created_at: string
          dropped_by: string
          expires_at: string
          id: string
          league_id: string
          player_id: string
          resolved: boolean
        }
        Insert: {
          created_at?: string
          dropped_by: string
          expires_at?: string
          id?: string
          league_id: string
          player_id: string
          resolved?: boolean
        }
        Update: {
          created_at?: string
          dropped_by?: string
          expires_at?: string
          id?: string
          league_id?: string
          player_id?: string
          resolved?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "player_waivers_dropped_by_fkey"
            columns: ["dropped_by"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_waivers_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_waivers_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
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
          first_name: string
          id: string
          last_name: string
          preferred_team_name: string
        }
        Insert: {
          avatar_url?: string | null
          display_name?: string
          first_name?: string
          id: string
          last_name?: string
          preferred_team_name?: string
        }
        Update: {
          avatar_url?: string | null
          display_name?: string
          first_name?: string
          id?: string
          last_name?: string
          preferred_team_name?: string
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
      schedule_checks: {
        Row: {
          check_date: string
          checked_at: string
        }
        Insert: {
          check_date: string
          checked_at?: string
        }
        Update: {
          check_date?: string
          checked_at?: string
        }
        Relationships: []
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
      waiver_claims: {
        Row: {
          created_at: string
          drop_player: string | null
          drop_slot: number
          id: string
          status: string
          team_id: string
          waiver_id: string
        }
        Insert: {
          created_at?: string
          drop_player?: string | null
          drop_slot: number
          id?: string
          status?: string
          team_id: string
          waiver_id: string
        }
        Update: {
          created_at?: string
          drop_player?: string | null
          drop_slot?: number
          id?: string
          status?: string
          team_id?: string
          waiver_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "waiver_claims_drop_player_fkey"
            columns: ["drop_player"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "waiver_claims_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "waiver_claims_waiver_id_fkey"
            columns: ["waiver_id"]
            isOneToOne: false
            referencedRelation: "player_waivers"
            referencedColumns: ["id"]
          },
        ]
      }
      waiver_priority: {
        Row: {
          league_id: string
          rank: number
          team_id: string
        }
        Insert: {
          league_id: string
          rank: number
          team_id: string
        }
        Update: {
          league_id?: string
          rank?: number
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "waiver_priority_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "waiver_priority_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: true
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
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
      build_league_schedule: { Args: { lid: string }; Returns: undefined }
      can_read_league: { Args: { lid: string }; Returns: boolean }
      cancel_waiver_claim: { Args: { cid: string }; Returns: undefined }
      check_trade_players: {
        Args: {
          from_id: string
          get_id: string
          give_id: string
          lid: string
          to_id: string
        }
        Returns: undefined
      }
      claim_player: {
        Args: { drop_slot?: number; pid: string; tid: string }
        Returns: undefined
      }
      configure_league_controls: {
        Args: {
          capacity: number
          invitations: boolean
          lid: string
          pickups: boolean
          start_date?: string
          swaps: boolean
        }
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
      offer_player_trade: {
        Args: {
          from_id: string
          get_id: string
          give_id: string
          parent_id?: string
          to_id: string
        }
        Returns: string
      }
      record_fantasy_boxscore: {
        Args: { gdate: string; lid: string; pid: string; stats: Json }
        Returns: undefined
      }
      resolve_league_waivers: { Args: { lid: string }; Returns: undefined }
      respond_player_trade: {
        Args: { decision: string; trade_id: string }
        Returns: undefined
      }
      submit_waiver_claim: {
        Args: { slot_no: number; tid: string; wid: string }
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
