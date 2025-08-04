"use client";

import axios from "axios";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const useService = () => {
  const [modalData, setModalData] = useState({
    type: "",
    isOpen: false,
    message: "",
    title: "",
    key: 1,
    children: "",
    onNext: () => {},
    onClose: () => setModalData((prev) => ({ ...prev, isOpen: false })),
  });

  const requestPost = async (
    body: any,
    endpoint: string,
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ): Promise<any> => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);

      return response;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const requestGet = async (endpoint: string): Promise<any> => {
    try {
      const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    requestPost,
    modalData,
    setModalData,
    requestGet,
  };
};

export default useService;
