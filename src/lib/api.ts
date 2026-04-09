import type {
  StrapiResponse,
  DocumentationSection,
  ApiEndpoint,
  BankEntry,
  OperatorWallet,
  TestDataEntry,
} from "./types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

async function fetchAPI<T>(path: string): Promise<T> {
  const res = await fetch(`${STRAPI_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Strapi fetch failed: ${res.status} ${path}`);
  }
  return res.json();
}

// ── Query keys (centralized for cache management) ──
export const queryKeys = {
  sidebar: ["sidebar-sections"] as const,
  allSections: ["all-sections"] as const,
  allEndpoints: ["all-endpoints"] as const,
  endpointsBySection: (slug: string) => ["endpoints", slug] as const,
  banks: ["banks"] as const,
  operators: ["operators"] as const,
  testData: ["test-data"] as const,
};

// ── Fetch functions ──

export async function fetchSidebarSections(): Promise<DocumentationSection[]> {
  const res = await fetchAPI<StrapiResponse<DocumentationSection>>(
    "/api/documentation-sections?filters[parent][id][$null]=true&populate[0]=children&sort=order:asc"
  );
  return res.data || [];
}

export async function fetchAllSections(): Promise<DocumentationSection[]> {
  const res = await fetchAPI<StrapiResponse<DocumentationSection>>(
    "/api/documentation-sections?sort=order:asc&populate[0]=children&populate[1]=global_response_codes&populate[2]=alerts&populate[3]=api_endpoints&populate[4]=parent&pagination[pageSize]=100"
  );
  return res.data || [];
}

export async function fetchAllEndpoints(): Promise<ApiEndpoint[]> {
  const res = await fetchAPI<StrapiResponse<ApiEndpoint>>(
    "/api/api-endpoints?sort=order:asc&populate[0]=input_parameters&populate[1]=response_codes&populate[2]=code_samples&populate[3]=alerts&populate[4]=section&pagination[pageSize]=100"
  );
  return res.data || [];
}

export async function fetchEndpointsBySection(slug: string): Promise<ApiEndpoint[]> {
  const res = await fetchAPI<StrapiResponse<ApiEndpoint>>(
    `/api/api-endpoints?filters[section][slug]=${slug}&sort=order:asc&populate[0]=input_parameters&populate[1]=response_codes&populate[2]=code_samples&populate[3]=alerts`
  );
  return res.data || [];
}

export async function fetchBanks(): Promise<BankEntry[]> {
  const res = await fetchAPI<StrapiResponse<BankEntry>>(
    "/api/bank-entries?sort[0]=country_iso2:asc&sort[1]=bank_name:asc&pagination[pageSize]=200"
  );
  return res.data || [];
}

export async function fetchOperators(): Promise<OperatorWallet[]> {
  const res = await fetchAPI<StrapiResponse<OperatorWallet>>(
    "/api/operator-wallets?sort[0]=country:asc&sort[1]=operator_name:asc&pagination[pageSize]=200"
  );
  return res.data || [];
}

export async function fetchTestData(): Promise<TestDataEntry[]> {
  const res = await fetchAPI<StrapiResponse<TestDataEntry>>(
    "/api/test-data-entries?sort[0]=type:asc&sort[1]=country:asc&pagination[pageSize]=100"
  );
  return res.data || [];
}
