import React, { useEffect } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "@/utils/contexts/authContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Signin = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="w-full h-screen bg-dark text-white mt-40">
      <h1 className="text-center text-3xl font-bold py-8">Sign in</h1>
      <div className="max-w-[240px] m-auto py-4">
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
};

export default Signin;
