// ── Strapi wrapper ──
export interface StrapiResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// ── Components ──
export interface ApiParameter {
  id: number;
  field: string;
  value_format: string;
  required_status: "Required" | "Optional";
  description: string;
}

export interface ResponseCode {
  id: number;
  code: string;
  title: string;
  content?: string;
  description?: string;
}

export interface CodeSample {
  id: number;
  label: string;
  language: "bash" | "json" | "javascript" | "text";
  code: string;
}

export interface InfoAlert {
  id: number;
  type: "info" | "warning" | "danger";
  content: string;
}

// ── Content Types ──
export interface DocumentationSection {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  anchor_id: string;
  order: number;
  content: string;
  parent?: DocumentationSection | null;
  children?: DocumentationSection[];
  api_endpoints?: ApiEndpoint[];
  global_response_codes?: ResponseCode[];
  alerts?: InfoAlert[];
}

export interface ApiEndpoint {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  http_method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  order: number;
  section?: DocumentationSection;
  input_parameters?: ApiParameter[];
  response_codes?: ResponseCode[];
  code_samples?: CodeSample[];
  alerts?: InfoAlert[];
}

export interface BankEntry {
  id: number;
  documentId: string;
  bank_name: string;
  bank_code: string;
  country_name: string;
  country_iso2: string;
}

export interface OperatorWallet {
  id: number;
  documentId: string;
  country: string;
  operator_name: string;
  operator_code: string;
}

export interface TestDataEntry {
  id: number;
  documentId: string;
  type: "bank_account" | "mobile_wallet";
  bank_or_operator: string;
  account_or_phone: string;
  country: string;
  bank_code: string;
  notes: string;
}
