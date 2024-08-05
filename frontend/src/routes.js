import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import { useEffect } from "react";
import { useState } from "react";

const Say = ({ word }) => {
  return <h1>{word}</h1>;
};

export const ProtectedRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<Say word={"Oops page not found"} />} />
      </Routes>
    </>
  );
};

export const UnProtectedRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Say word={"Oops page not found"} />} />
      </Routes>
    </>
  );
};

export const Router = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setUserLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      {isUserLoggedIn ? <ProtectedRoutes /> : <UnProtectedRoutes />}
    </BrowserRouter>
  );
};
