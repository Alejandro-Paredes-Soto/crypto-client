"use client";

import { Eye, EyeOff, TrendingUp, Shield, BarChart3 } from "lucide-react";
import useRegister from "./useRegister";
import Modal from "../components/Modal";

export default function Register() {
  const {
    handleSubmit,
    onRouterLink,
    formData,
    isLoading,
    setShowPassword,
    showPassword,
    handleInputChange,
    setShowPassword2,
    showPassword2,
    modalData,
  } = useRegister();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Brand and features */}
        <div className="hidden lg:block space-y-8 text-white">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                CryptoInvestment
              </h1>
            </div>
            <p className="text-xl text-slate-300">
              Plataforma profesional para inversores en criptomonedas
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-purple-600/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Seguimiento en Tiempo Real
                </h3>
                <p className="text-slate-400">
                  Monitorea precios, cambios porcentuales y volumen de mercado
                  al instante
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-cyan-600/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Persistencia de Datos
                </h3>
                <p className="text-slate-400">
                  Historial completo y verificación de líneas de tiempo
                  personalizables
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-indigo-600/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Vista Consolidada
                </h3>
                <p className="text-slate-400">
                  Una sola interfaz para todas tus inversiones sin recargas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full max-w-md mx-auto lg:max-w-none">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-10 shadow-2xl border border-white/20">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                CryptoInvestment
              </h1>
            </div>

            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Registrate
                </h2>
                <p className="text-slate-300">
                  Accede a tu panel de inversiones
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-slate-200"
                  >
                    Nombre(s)
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Alejandro"
                    required
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="lastname"
                    className="text-sm font-medium text-slate-200"
                  >
                    Apellido(s)
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Paredes"
                    required
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-200"
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-200"
                  >
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password2"
                    className="text-sm font-medium text-slate-200"
                  >
                    Confirma la contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword2 ? "text" : "password"}
                      id="password2"
                      name="password2"
                      value={formData.password2}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword2(!showPassword2)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showPassword2 ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Registrando...</span>
                    </div>
                  ) : (
                    "Registrarse"
                  )}
                </button>
              </form>

              <div className="text-center">
                <p className="text-slate-400">
                  ¿Ya tienes una cuenta?{" "}
                  <button
                    onClick={() => onRouterLink("/login")}
                    style={{ cursor: "pointer" }}
                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                  >
                    Inicia Sesion aquí
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-6 flex items-center justify-center space-x-6 text-slate-400 text-sm">
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4" />
              <span>Seguro</span>
            </div>
            <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
            <div className="flex items-center space-x-1">
              <span>Datos Encriptados</span>
            </div>
            <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
            <div className="flex items-center space-x-1">
              <span>24/7 Activo</span>
            </div>
          </div>
        </div>
      </div>
      {/* Modal*/}
      <Modal
        type={modalData.type}
        onNext={modalData.onNext}
        isOpen={modalData.isOpen}
        message={modalData.message}
        title={modalData.title}
        key={modalData.key}
        children={modalData.children}
        onClose={modalData.onClose}
      />
    </div>
  );
}
