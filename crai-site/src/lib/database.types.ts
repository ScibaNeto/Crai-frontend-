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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      convites: {
        Row: {
          aceito_em: string | null
          aceito_por: string | null
          convidado_por: string | null
          created_at: string
          email: string
          empresa_id: string
          expira_em: string
          id: string
          papel: Database["public"]["Enums"]["papel_membro"]
          status: Database["public"]["Enums"]["status_convite"]
          token: string
        }
        Insert: {
          aceito_em?: string | null
          aceito_por?: string | null
          convidado_por?: string | null
          created_at?: string
          email: string
          empresa_id: string
          expira_em?: string
          id?: string
          papel?: Database["public"]["Enums"]["papel_membro"]
          status?: Database["public"]["Enums"]["status_convite"]
          token?: string
        }
        Update: {
          aceito_em?: string | null
          aceito_por?: string | null
          convidado_por?: string | null
          created_at?: string
          email?: string
          empresa_id?: string
          expira_em?: string
          id?: string
          papel?: Database["public"]["Enums"]["papel_membro"]
          status?: Database["public"]["Enums"]["status_convite"]
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "convites_aceito_por_fkey"
            columns: ["aceito_por"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "convites_convidado_por_fkey"
            columns: ["convidado_por"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "convites_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      empresas: {
        Row: {
          cnpj: string
          created_at: string
          criado_por: string | null
          email_financeiro: string | null
          faixa_mrr: Database["public"]["Enums"]["faixa_mrr"] | null
          id: string
          inicio_previsto: string | null
          nome_fantasia: string | null
          plano: Database["public"]["Enums"]["plano_crai"]
          qtd_clientes_ativos: number | null
          razao_social: string
          segmento: string | null
          site: string | null
          status: Database["public"]["Enums"]["status_empresa"]
          updated_at: string
        }
        Insert: {
          cnpj: string
          created_at?: string
          criado_por?: string | null
          email_financeiro?: string | null
          faixa_mrr?: Database["public"]["Enums"]["faixa_mrr"] | null
          id?: string
          inicio_previsto?: string | null
          nome_fantasia?: string | null
          plano?: Database["public"]["Enums"]["plano_crai"]
          qtd_clientes_ativos?: number | null
          razao_social: string
          segmento?: string | null
          site?: string | null
          status?: Database["public"]["Enums"]["status_empresa"]
          updated_at?: string
        }
        Update: {
          cnpj?: string
          created_at?: string
          criado_por?: string | null
          email_financeiro?: string | null
          faixa_mrr?: Database["public"]["Enums"]["faixa_mrr"] | null
          id?: string
          inicio_previsto?: string | null
          nome_fantasia?: string | null
          plano?: Database["public"]["Enums"]["plano_crai"]
          qtd_clientes_ativos?: number | null
          razao_social?: string
          segmento?: string | null
          site?: string | null
          status?: Database["public"]["Enums"]["status_empresa"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "empresas_criado_por_fkey"
            columns: ["criado_por"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
        ]
      }
      membros_empresa: {
        Row: {
          created_at: string
          empresa_id: string
          papel: Database["public"]["Enums"]["papel_membro"]
          usuario_id: string
        }
        Insert: {
          created_at?: string
          empresa_id: string
          papel?: Database["public"]["Enums"]["papel_membro"]
          usuario_id: string
        }
        Update: {
          created_at?: string
          empresa_id?: string
          papel?: Database["public"]["Enums"]["papel_membro"]
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "membros_empresa_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "membros_empresa_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
        ]
      }
      perfis: {
        Row: {
          aceite_comunicacao_em: string | null
          aceite_privacidade_em: string | null
          aceite_termos_em: string | null
          avatar_url: string | null
          cargo: string | null
          created_at: string
          email: string | null
          empresa_ativa_id: string | null
          id: string
          nome_completo: string
          telefone: string | null
          updated_at: string
        }
        Insert: {
          aceite_comunicacao_em?: string | null
          aceite_privacidade_em?: string | null
          aceite_termos_em?: string | null
          avatar_url?: string | null
          cargo?: string | null
          created_at?: string
          email?: string | null
          empresa_ativa_id?: string | null
          id: string
          nome_completo?: string
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          aceite_comunicacao_em?: string | null
          aceite_privacidade_em?: string | null
          aceite_termos_em?: string | null
          avatar_url?: string | null
          cargo?: string | null
          created_at?: string
          email?: string | null
          empresa_ativa_id?: string | null
          id?: string
          nome_completo?: string
          telefone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "perfis_empresa_ativa_fk"
            columns: ["empresa_ativa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      aceitar_convite: { Args: { p_token: string }; Returns: string }
      cnpj_valido: { Args: { p_cnpj: string }; Returns: boolean }
      criar_empresa: {
        Args: {
          p_cnpj: string
          p_email_financeiro?: string
          p_faixa_mrr?: Database["public"]["Enums"]["faixa_mrr"]
          p_inicio_previsto?: string
          p_nome_fantasia?: string
          p_plano?: Database["public"]["Enums"]["plano_crai"]
          p_qtd_clientes_ativos?: number
          p_razao_social: string
          p_segmento?: string
          p_site?: string
        }
        Returns: {
          cnpj: string
          created_at: string
          criado_por: string | null
          email_financeiro: string | null
          faixa_mrr: Database["public"]["Enums"]["faixa_mrr"] | null
          id: string
          inicio_previsto: string | null
          nome_fantasia: string | null
          plano: Database["public"]["Enums"]["plano_crai"]
          qtd_clientes_ativos: number | null
          razao_social: string
          segmento: string | null
          site: string | null
          status: Database["public"]["Enums"]["status_empresa"]
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "empresas"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
    }
    Enums: {
      faixa_mrr: "ate_25k" | "25k_75k" | "75k_200k" | "200k_500k" | "acima_500k"
      papel_membro: "owner" | "admin" | "membro"
      plano_crai: "standard" | "premium"
      status_convite: "pendente" | "aceito" | "revogado"
      status_empresa: "onboarding" | "ativa" | "suspensa" | "cancelada"
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
    Enums: {
      faixa_mrr: ["ate_25k", "25k_75k", "75k_200k", "200k_500k", "acima_500k"],
      papel_membro: ["owner", "admin", "membro"],
      plano_crai: ["standard", "premium"],
      status_convite: ["pendente", "aceito", "revogado"],
      status_empresa: ["onboarding", "ativa", "suspensa", "cancelada"],
    },
  },
} as const
