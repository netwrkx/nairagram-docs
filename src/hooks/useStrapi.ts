import { useQuery } from "@tanstack/react-query";
import {
  queryKeys,
  fetchSidebarSections,
  fetchAllSections,
  fetchAllEndpoints,
  fetchEndpointsBySection,
  fetchBanks,
  fetchOperators,
  fetchTestData,
} from "@/lib/api";

export function useSidebarSections() {
  return useQuery({
    queryKey: queryKeys.sidebar,
    queryFn: fetchSidebarSections,
    staleTime: 5 * 60 * 1000, // 5 min
    gcTime: 30 * 60 * 1000,   // 30 min cache
  });
}

export function useAllSections() {
  return useQuery({
    queryKey: queryKeys.allSections,
    queryFn: fetchAllSections,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

export function useAllEndpoints() {
  return useQuery({
    queryKey: queryKeys.allEndpoints,
    queryFn: fetchAllEndpoints,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

export function useEndpointsBySection(slug: string) {
  return useQuery({
    queryKey: queryKeys.endpointsBySection(slug),
    queryFn: () => fetchEndpointsBySection(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

export function useBanks() {
  return useQuery({
    queryKey: queryKeys.banks,
    queryFn: fetchBanks,
    staleTime: 10 * 60 * 1000,  // 10 min — rarely changes
    gcTime: 60 * 60 * 1000,
  });
}

export function useOperators() {
  return useQuery({
    queryKey: queryKeys.operators,
    queryFn: fetchOperators,
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}

export function useTestData() {
  return useQuery({
    queryKey: queryKeys.testData,
    queryFn: fetchTestData,
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}

/**
 * Combined hook — fetches all documentation data in parallel.
 * Returns a single loading/error state for the whole page.
 */
export function useDocumentationData() {
  const sections = useAllSections();
  const endpoints = useAllEndpoints();
  const banks = useBanks();
  const operators = useOperators();
  const testData = useTestData();

  const isLoading =
    sections.isLoading ||
    endpoints.isLoading ||
    banks.isLoading ||
    operators.isLoading ||
    testData.isLoading;

  const isError =
    sections.isError ||
    endpoints.isError ||
    banks.isError ||
    operators.isError ||
    testData.isError;

  const error =
    sections.error ||
    endpoints.error ||
    banks.error ||
    operators.error ||
    testData.error;

  return {
    isLoading,
    isError,
    error,
    sections: sections.data || [],
    endpoints: endpoints.data || [],
    banks: banks.data || [],
    operators: operators.data || [],
    testData: testData.data || [],
  };
}
