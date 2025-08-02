"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useService from "../services/useServices";
const useLogin = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const { requestPost, modalData, setModalData } = useService();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await requestPost(formData, "/user/login", setIsLoading);

      console.log(res);

      if (res.status == 200) {
        //logueado
        localStorage.setItem("token", res.data.token);
        router.push("/dashboard");
      }
    } catch (error) {
      setModalData({
        ...modalData,
        type: "error",
        isOpen: true,
        title: "Error",
        onClose: () => setModalData((prev) => ({ ...prev, isOpen: false })),
        message: "Las contraseñas no coinciden",
      });
    }
    setIsLoading(true);

    // // Simular autenticación
    // setTimeout(() => {
    //   setIsLoading(false);
    //   alert("¡Bienvenido a CryptoInvestment!");
    // }, 2000);
  };

  const onRouterLink = (route: string) => {
    router.push(route);
  };

  return {
    showPassword,
    setShowPassword,
    formData,
    isLoading,
    handleInputChange,
    handleSubmit,
    onRouterLink,
  };
};

export default useLogin;
