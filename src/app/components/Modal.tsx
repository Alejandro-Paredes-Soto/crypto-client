import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  X,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  onNext,
  type = "success",
  title,
  message,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  type: string;
  title: string;
  message: string;
  children: any;
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-12 h-12 text-green-400" />;
      case "error":
        return <XCircle className="w-12 h-12 text-red-400" />;
      case "warning":
        return <AlertTriangle className="w-12 h-12 text-yellow-400" />;
      default:
        return <CheckCircle className="w-12 h-12 text-green-400" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case "success":
        return {
          bg: "from-green-500/20 to-emerald-500/20",
          border: "border-green-500/30",
          button:
            "from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700",
          glow: "shadow-green-500/25",
        };
      case "error":
        return {
          bg: "from-red-500/20 to-rose-500/20",
          border: "border-red-500/30",
          button:
            "from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700",
          glow: "shadow-red-500/25",
        };
      case "warning":
        return {
          bg: "from-yellow-500/20 to-orange-500/20",
          border: "border-yellow-500/30",
          button:
            "from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700",
          glow: "shadow-yellow-500/25",
        };
      default:
        return {
          bg: "from-green-500/20 to-emerald-500/20",
          border: "border-green-500/30",
          button:
            "from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700",
          glow: "shadow-green-500/25",
        };
    }
  };

  const colors = getColors();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div
        className={`relative w-full max-w-md mx-auto bg-gradient-to-br ${colors.bg} backdrop-blur-xl rounded-3xl p-8 shadow-2xl ${colors.glow} border ${colors.border} transform transition-all duration-300 scale-100 animate-pulse`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-all duration-200"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="relative">
              {getIcon()}
              <div className="absolute inset-0 animate-ping opacity-20">
                {getIcon()}
              </div>
            </div>
          </div>

          {/* Title and Message */}
          <div className="space-y-3">
            {title && (
              <h3 className="text-2xl font-bold text-white">{title}</h3>
            )}
            {message && (
              <p className="text-slate-300 leading-relaxed">{message}</p>
            )}
          </div>

          {/* Custom content */}
          {children && <div className="space-y-4">{children}</div>}

          {/* Action button */}
          <button
            onClick={onNext}
            className={`w-full bg-gradient-to-r ${colors.button} text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg`}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
