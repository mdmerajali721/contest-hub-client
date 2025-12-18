import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = instance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;

      return config;
    });

    const resInterceptor = instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        console.log(err);
        toast.error(err.message);

        const status = err.status;

        if (status === 401 || status === 403) {
          logOutUser().then(() => {
            navigate("/auth/login");
          });
        }

        return Promise.reject(err);
      }
    );

    return () => {
      instance.interceptors.request.eject(reqInterceptor);
      instance.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOutUser, navigate]);

  return instance;
};

export default useAxiosSecure;
