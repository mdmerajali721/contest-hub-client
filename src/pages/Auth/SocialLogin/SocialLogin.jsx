import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { googleLogin } = useAuth();
  const location = useLocation();

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const { displayName, email, photoURL } = result.user;

        const userInfo = {
          displayName,
          email,
          photoURL,
        };
 
        axiosSecure.post("/users", userInfo);

        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: `Welcome, ${displayName}!`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate(location.state || "/");
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: err.message,
        });
      });
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="flex items-center cursor-pointer justify-center gap-2 w-full border border-gray-200 rounded-md py-3 hover:shadow-sm transition"
    >
      <FcGoogle size="22" />
      <span className="font-semibold hover:text-green-500">
        Sign up with Google
      </span>
    </button>
  );
};

export default SocialLogin;
