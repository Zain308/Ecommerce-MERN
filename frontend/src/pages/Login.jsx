import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Login from "../components/Login/Login.jsx"
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]); 

  return (
    <div>
      <Login />
    </div>
  );
}