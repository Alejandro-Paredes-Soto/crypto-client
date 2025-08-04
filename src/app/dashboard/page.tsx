"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { redirect } from "next/navigation";

import {
  TrendingUp,
  TrendingDown,
  Search,
  Plus,
  BarChart3,
  Eye,
  X,
  Calendar,
  Clock,
  DollarSign,
  Activity,
  Settings,
  Bell,
  User,
  Filter,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import useDash from "./useDash";
import Modal from "../components/Modal";
import useService from "../services/useServices";
import { useRouter } from "next/navigation";

//Data init
const mockCryptoData = [
  {
    id: 1,
    symbol: "BTC",
    name: "Bitcoin",
    price: 43250.85,
    change24h: 2.45,
    volume24h: 28450000000,
    marketCap: 847500000000,
    history: [
      { time: "00:00", price: 42800 },
      { time: "04:00", price: 42950 },
      { time: "08:00", price: 43100 },
      { time: "12:00", price: 43380 },
      { time: "16:00", price: 43200 },
      { time: "20:00", price: 43250 },
    ],
  },
  {
    id: 2,
    symbol: "ETH",
    name: "Ethereum",
    price: 2680.45,
    change24h: -1.23,
    volume24h: 15200000000,
    marketCap: 322100000000,
    history: [
      { time: "00:00", price: 2720 },
      { time: "04:00", price: 2705 },
      { time: "08:00", price: 2690 },
      { time: "12:00", price: 2675 },
      { time: "16:00", price: 2685 },
      { time: "20:00", price: 2680 },
    ],
  },
  {
    id: 3,
    symbol: "ADA",
    name: "Cardano",
    price: 0.485,
    change24h: 5.67,
    volume24h: 890000000,
    marketCap: 17200000000,
    history: [
      { time: "00:00", price: 0.459 },
      { time: "04:00", price: 0.467 },
      { time: "08:00", price: 0.471 },
      { time: "12:00", price: 0.478 },
      { time: "16:00", price: 0.482 },
      { time: "20:00", price: 0.485 },
    ],
  },
  {
    id: 4,
    symbol: "SOL",
    name: "Solana",
    price: 98.73,
    change24h: -3.45,
    volume24h: 2340000000,
    marketCap: 43800000000,
    history: [
      { time: "00:00", price: 102.5 },
      { time: "04:00", price: 101.2 },
      { time: "08:00", price: 100.1 },
      { time: "12:00", price: 99.8 },
      { time: "16:00", price: 99.2 },
      { time: "20:00", price: 98.73 },
    ],
  },
];

const availableCryptos = [
  { id: 5, symbol: "DOT", name: "Polkadot", price: 7.25, change24h: 1.85 },
  { id: 6, symbol: "AVAX", name: "Avalanche", price: 24.67, change24h: -2.13 },
  { id: 7, symbol: "MATIC", name: "Polygon", price: 0.89, change24h: 4.32 },
  { id: 8, symbol: "LINK", name: "Chainlink", price: 14.55, change24h: 0.97 },
];

export default function CryptoDashboard() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/login");
    }
  }, []);
  const router = useRouter();
  const [watchlist, setWatchlist] = useState(mockCryptoData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);

  const [isClient, setIsClient] = useState(false);

  const [isOpenMenu, setisOpenMenu] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { fetchCurrentPrices, mapApiToWatchlist } = useDash();
  const { modalData, setModalData } = useService();

  useEffect(() => {
    if (!isAutoRefresh) return;

    const intervalId = setInterval(async () => {
      try {
        console.log("Actualizando precios cada 5 segundos...");
        const res = await fetchCurrentPrices();
        const newData = mapApiToWatchlist(res.data.data).map((d: any) => {
          return {
            id: d.id,
            symbol: d.symbol,
            name: d.name,
            price: d.price,
            change24h: 2.45,
            volume24h: d.volume24h,
            marketCap: d.marketCap,
            history: [
              {
                time: "00:00",
                price: Math.floor(10000 + Math.random() * 90000),
              },
              {
                time: "04:00",
                price: Math.floor(10000 + Math.random() * 90000),
              },
              {
                time: "08:00",
                price: Math.floor(10000 + Math.random() * 90000),
              },
              {
                time: "12:00",
                price: Math.floor(10000 + Math.random() * 90000),
              },
              {
                time: "16:00",
                price: Math.floor(10000 + Math.random() * 90000),
              },
              {
                time: "20:00",
                price: Math.floor(10000 + Math.random() * 90000),
              },
            ],
          };
        });

        setWatchlist(newData);
        setLastUpdate(new Date());
      } catch (error) {
        console.error("Error al actualizar precios", error);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isAutoRefresh]);

  const formatPrice = (price: any) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 4 : 2,
    }).format(price);
  };

  const formatVolume = (volume: any) => {
    if (!volume || isNaN(volume)) return "$0.00";
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`;
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`;
    return `$${volume.toLocaleString()}`;
  };

  const addToWatchlist = async (crypto: any) => {
    //setShowAddModal(false);

    let obj = {
      symbol: crypto.symbol,
      name: crypto.name,
      price: crypto.price,
      change24h: crypto.change24h,
      volume_24h: 28450000000,
      market_cap: 847500000000,
      percent_change_24h: 55,
      history: [
        { time: "00:00", price: 42800 },
        { time: "04:00", price: 42950 },
        { time: "08:00", price: 43100 },
        { time: "12:00", price: 43380 },
        { time: "16:00", price: 43200 },
        { time: "20:00", price: 43250 },
      ],
    };
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
      const response = await axios.post(`${API_BASE_URL}/coin/addCrypto`, obj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.status == 200) {
        setModalData({
          ...modalData,
          type: "success",
          isOpen: true,
          title: "Agregado",
          onNext: () => setModalData((prev) => ({ ...prev, isOpen: false })),
          onClose: () => setModalData((prev) => ({ ...prev, isOpen: false })),
          message: "Crypto agregado",
        });

        const res = await fetchCurrentPrices();

        let newData = mapApiToWatchlist(res.data.data);
        setWatchlist(newData);
        setShowAddModal(false);
      }
    } catch (error) {
      setModalData({
        ...modalData,
        type: "error",
        isOpen: true,
        title: "Error",
        onNext: () => setModalData((prev) => ({ ...prev, isOpen: false })),
        onClose: () => setModalData((prev) => ({ ...prev, isOpen: false })),
        message: "Ocurrio un error",
      });
    }
  };

  const removeFromWatchlist = (id: any) => {
    setWatchlist((prev) => prev.filter((crypto) => crypto.id !== id));
  };

  const filteredCryptos = availableCryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPortfolioValue = watchlist.reduce(
    (sum, crypto) => (sum + crypto.price == null ? 0 : crypto.price),
    0
  );
  const avgChange =
    watchlist.reduce((sum, crypto) => sum + crypto.change24h, 0) /
    watchlist.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 bg-white/5 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  CryptoInvestment
                </h1>
              </div>

              {/* Header actions */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <Clock className="w-4 h-4" />
                  <span>
                    {isClient && (
                      <span>
                        Actualizado: {lastUpdate.toLocaleTimeString()}
                      </span>
                    )}
                  </span>
                </div>

                <button
                  onClick={() => setIsAutoRefresh(!isAutoRefresh)}
                  className={`p-2 rounded-lg transition-colors ${
                    isAutoRefresh
                      ? "bg-green-600/20 text-green-400"
                      : "bg-slate-600/20 text-slate-400"
                  }`}
                ></button>

                <button className="p-2 rounded-lg bg-white/10 text-slate-300 hover:text-white transition-colors">
                  <Bell className="w-4 h-4" />
                </button>

                <div className="relative z-[1000] inline-block text-left">
                  {/* Botón del usuario */}
                  <button
                    onClick={() => setisOpenMenu(!isOpenMenu)}
                    className="p-2 rounded-lg bg-white/10 text-slate-300 hover:text-white transition-colors"
                  >
                    <User className="w-4 h-4" />
                  </button>

                  {/* Menú dropdown */}
                  {isOpenMenu && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[9999]">
                      <ul className="py-1">
                        <li>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            onClick={() => {
                              localStorage.removeItem("token");
                              router.push("/login");
                            }}
                          >
                            Cerrar sesión
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Portfolio overview */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            style={{ zIndex: "-1", position: "relative" }}
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-300 text-sm font-medium">
                  Valor Total
                </h3>
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {formatPrice(totalPortfolioValue)}
              </div>
              <div
                className={`flex items-center text-sm ${
                  avgChange >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {avgChange >= 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {Math.abs(avgChange).toFixed(2)}% promedio
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-300 text-sm font-medium">
                  Activos Seguidos
                </h3>
                <Activity className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {watchlist.length}
              </div>
              <div className="text-sm text-slate-400">
                Criptomonedas activas
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-300 text-sm font-medium">
                  Mejor Rendimiento
                </h3>
                <BarChart3 className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {Math.max(...watchlist.map((c) => c.change24h)).toFixed(2)}%
              </div>
              <div className="text-sm text-green-400">
                {
                  watchlist.find(
                    (c) =>
                      c.change24h ===
                      Math.max(...watchlist.map((cr) => cr.change24h))
                  )?.symbol
                }
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setShowAddModal(true);
                }}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-all duration-200 transform hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Cripto</span>
              </button>
            </div>
          </div>

          {/* Crypto cards */}
          <div className="space-y-6">
            {watchlist.map((crypto, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-200"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {crypto.symbol}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {crypto.name}
                        </h3>
                        <p className="text-slate-400">{crypto.symbol}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromWatchlist(crypto.id)}
                      className="lg:ml-auto p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">
                        Precio Actual
                      </p>
                      <p className="text-2xl font-bold text-white">
                        {formatPrice(crypto.price)}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400 text-sm mb-1">Cambio 24h</p>
                      <p
                        className={`text-xl font-semibold flex items-center ${
                          crypto.change24h >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {crypto.change24h >= 0 ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        {Math.abs(crypto.change24h).toFixed(2)}%
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400 text-sm mb-1">Volumen 24h</p>
                      <p className="text-xl font-semibold text-white">
                        {formatVolume(crypto.volume24h)}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400 text-sm mb-1">
                        Cap. Mercado
                      </p>
                      <p className="text-xl font-semibold text-white">
                        {formatVolume(crypto.marketCap)}
                      </p>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={crypto.history}>
                        <defs>
                          <linearGradient
                            id={`gradient-${crypto.id}`}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor={
                                crypto.change24h >= 0 ? "#10b981" : "#ef4444"
                              }
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor={
                                crypto.change24h >= 0 ? "#10b981" : "#ef4444"
                              }
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="time" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(30, 41, 59, 0.9)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            borderRadius: "12px",
                            color: "white",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke={crypto.change24h >= 0 ? "#10b981" : "#ef4444"}
                          strokeWidth={2}
                          fill={`url(#gradient-${crypto.id})`}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Add Crypto Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">
                Agregar Criptomoneda
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                }}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar criptomoneda..."
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {filteredCryptos.map((crypto) => (
                <div
                  key={crypto.id}
                  onClick={() => addToWatchlist(crypto)}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xs">
                        {crypto.symbol}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{crypto.name}</p>
                      <p className="text-slate-400 text-sm">{crypto.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">
                      {formatPrice(crypto.price)}
                    </p>
                    <p
                      className={`text-sm ${
                        crypto.change24h >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {crypto.change24h >= 0 ? "+" : ""}
                      {crypto.change24h.toFixed(2)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <Modal
        isOpen={modalData.isOpen}
        message={modalData.message}
        children={""}
        onClose={modalData.onClose}
        onNext={modalData.onNext}
        title={modalData.title}
        type="success"
        key={4}
      />
    </div>
  );
}
