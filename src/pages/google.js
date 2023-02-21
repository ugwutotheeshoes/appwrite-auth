import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Link from "next/link";
import { FaJenkins } from "react-icons/fa";

const Google = () => {
  const [user, setUser] = useState(false);

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const tokens = await axios.post("http://localhost:3000/google", {
        code: codeResponse.code,
      });
      setUser(true);

      console.log(tokens);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setUser(false);
  };

  return (
    <div className="section">
      {user ? (
        <main className="main-container">
          <div className="title">
            <FaJenkins />
            <div className="header">
              <h2>Bilbo Baggins</h2>
              <h4>date of birth: 22 September T.A. 2890 (131)</h4>
            </div>
          </div>
          <div className="data">
            <p>gender: male</p>
            <p>blood group: unknown</p>
            <p>weight: about 25 kilos (55 pounds)</p>
            <p>height: 4&apos;1&quot;</p>
            <p>address: Bag End</p>
            <p>email: bilbobags@gmail.com</p>
          </div>
          <Link href="/" className="log-btn" >
            Log out
          </Link>
        </main>
      ) : (
        <div>
          <h1 className="login">sign in to access your bio data.</h1>
          <button className="log-btn" onClick={() => googleLogin()}>
            Sign in with Google 🚀{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default Google;
