export type AuditStatus = "pending" | "running" | "completed" | "failed";
export type AuditSource = "self_serve" | "prospect";
export type GrowthOpportunity = "high" | "medium" | "low";
export type FindingCategory =
  | "seo"
  | "performance"
  | "local"
  | "conversion"
  | "trust"
  | "mobile";
export type FindingPriority = "high" | "medium" | "low";
export type FindingDifficulty = "easy" | "medium" | "advanced";
export type LeadStatus =
  | "new"
  | "not_contacted"
  | "contacted"
  | "interested"
  | "demo_meeting"
  | "quote_sent"
  | "won"
  | "lost";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AuditRow = {
  id: string;
  public_slug: string;
  url: string;
  normalized_url: string;
  status: AuditStatus;
  source: AuditSource;
  business_name: string | null;
  overall_score: number | null;
  seo_score: number | null;
  performance_score: number | null;
  local_score: number | null;
  lead_gen_score: number | null;
  mobile_score: number | null;
  trust_score: number | null;
  growth_opportunity: GrowthOpportunity | null;
  high_priority_count: number;
  medium_priority_count: number;
  low_priority_count: number;
  error_message: string | null;
  raw_metrics: Json;
  crawled_at: string | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
};

export type AuditPageRow = {
  id: string;
  audit_id: string;
  url: string;
  status_code: number | null;
  title: string | null;
  meta_description: string | null;
  is_homepage: boolean;
  signals: Json;
  created_at: string;
};

export type AuditFindingRow = {
  id: string;
  audit_id: string;
  code: string;
  category: FindingCategory;
  priority: FindingPriority;
  difficulty: FindingDifficulty;
  title: string;
  issue: string;
  why_it_matters: string;
  recommended_fix: string;
  is_unlocked_only: boolean;
  sort_order: number;
  created_at: string;
};

export type LeadRow = {
  id: string;
  audit_id: string;
  name: string;
  business_name: string;
  email: string;
  phone: string | null;
  website: string | null;
  lead_status: LeadStatus;
  quote_requested: boolean;
  quote_note: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      audits: {
        Row: AuditRow;
        Insert: Partial<AuditRow> &
          Pick<AuditRow, "public_slug" | "url" | "normalized_url">;
        Update: Partial<AuditRow>;
        Relationships: [];
      };
      audit_pages: {
        Row: AuditPageRow;
        Insert: Partial<AuditPageRow> &
          Pick<AuditPageRow, "audit_id" | "url">;
        Update: Partial<AuditPageRow>;
        Relationships: [];
      };
      audit_findings: {
        Row: AuditFindingRow;
        Insert: Partial<AuditFindingRow> &
          Pick<
            AuditFindingRow,
            | "audit_id"
            | "code"
            | "category"
            | "priority"
            | "difficulty"
            | "title"
            | "issue"
            | "why_it_matters"
            | "recommended_fix"
          >;
        Update: Partial<AuditFindingRow>;
        Relationships: [];
      };
      leads: {
        Row: LeadRow;
        Insert: Partial<LeadRow> &
          Pick<LeadRow, "audit_id" | "name" | "business_name" | "email">;
        Update: Partial<LeadRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      audit_status: AuditStatus;
      audit_source: AuditSource;
      growth_opportunity: GrowthOpportunity;
      finding_category: FindingCategory;
      finding_priority: FindingPriority;
      finding_difficulty: FindingDifficulty;
      lead_status: LeadStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};
