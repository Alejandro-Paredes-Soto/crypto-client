"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useService from "../services/useServices";

const useRegister = () => {
  // Definir la ruta
  const router = useRouter();
  const { requestPost, modalData, setModalData } = useService();

  // Definir la data inicial para enviar datos del usuario y registrarlo
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);

  // Función para registrarte
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password != formData.password2) {
      setModalData({
        ...modalData,
        type: "error",
        isOpen: true,
        title: "Error",
        onNext: () => setModalData((prev) => ({ ...prev, isOpen: false })),
        onClose: () => setModalData((prev) => ({ ...prev, isOpen: false })),
        message: "Las contraseñas no coinciden",
      });
      return;
    }
    try {
      const res = await requestPost(formData, "/user/register", setIsLoading);

      if (res.status == 200) {
        setModalData({
          ...modalData,
          type: "success",
          isOpen: true,
          title: "Satisfacorio",
          message: res.data.message,
          onNext: () => {
            router.push("/login");
          },
          onClose: () => setModalData((prev) => ({ ...prev, isOpen: false })),
        });
      }
    } catch (error: any) {
      setModalData({
        ...modalData,
        type: "error",
        isOpen: true,
        title: "Error",
        onNext: () => setModalData((prev) => ({ ...prev, isOpen: false })),
        onClose: () => setModalData((prev) => ({ ...prev, isOpen: false })),
        message: error.response.data.message,
      });
    }
  };

  const onRouterLink = (route: string) => {
    router.push(route);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return {
    handleSubmit,
    onRouterLink,
    formData,
    setFormData,
    isLoading,
    showPassword,
    setShowPassword,
    handleInputChange,
    showPassword2,
    setShowPassword2,

    modalData,
  };
};

export default useRegister;
