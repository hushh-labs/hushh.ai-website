import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import '../../../../pages/fonts.css'
import { useAuth } from "../../context/AuthContext";

const LogoutButton = () => {
  const { session, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/developer-Api/about-developer-api");
  };

  return (
    <div>
      {session ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button
          onClick={() =>
            router.push("/developer-Api/login")
          }
        >
          LogIn
        </button>
      )}
    </div>
  );
};

export default LogoutButton;
