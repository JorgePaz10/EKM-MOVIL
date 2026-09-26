import { useEffect, useCallback, useState } from "react";

export function useAutoRefresh(
  fetchFn: () => Promise<void>,
  intervalMs: number = 5 * 60 * 1000 // 5 minutos por defecto
) {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchFn();

    const interval = setInterval(() => {
      fetchFn();
    }, intervalMs);

    return () => clearInterval(interval);
  }, [fetchFn, intervalMs]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchFn();
    setRefreshing(false);
  }, [fetchFn]);

  return { refreshing, onRefresh };
}