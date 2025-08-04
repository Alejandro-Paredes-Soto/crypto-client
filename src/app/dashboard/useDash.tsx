"use client";

import { useEffect, useState } from "react";
import useService from "../services/useServices";

const useDash = () => {
  const { requestGet } = useService();

  async function fetchCurrentPrices() {
    try {
      const res = await requestGet("/coin/latest");

      return res;
    } catch (error) {
      console.error("Error cargando precios actuales:", error);
      throw error;
    }
  }

  function mapApiToWatchlist(apiData: any[]) {
    // Agrupar por símbolo y conservar el último registro por símbolo
    const latestBySymbol = new Map<string, any>();

    for (const entry of apiData) {
      latestBySymbol.set(entry.symbol, entry);
    }

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    const mapped = Array.from(latestBySymbol.values()).map((item, index) => ({
      id: item.id ?? index + 1,
      symbol: item.symbol,
      name: item.name,
      price: parseFloat(item.price),
      change24h: parseFloat(item.percent_change_24h),
      volume24h: parseFloat(item.volume_24h),
      marketCap: parseFloat(item.market_cap),
      history: [
        {
          time: `${hours}:${minutes}`,
          price: parseFloat(item.price),
        },
      ],
    }));

    return mapped;
  }

  return {
    fetchCurrentPrices,

    mapApiToWatchlist,
  };
};

export default useDash;
