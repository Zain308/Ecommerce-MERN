import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ActivationPage() {
  const { activation_token } = useParams();
  
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("Activating your account...");
  
  useEffect(() => {
    if (!activation_token) {
      setError(true);
      setMessage("No activation token found.");
      return;
    }

    const activate = async () => {
      try {
        await axios.post(`/api/v1/activation`, { activation_token }, {
          withCredentials: true
        });
        setMessage("Account activated! Redirecting...");
        setTimeout(() => window.location.href = "/", 2000);
      } catch (err) {
        setError(true);
        setMessage(err?.response?.data?.message || "Activation failed.");
      }
    };

    activate();
  }, [activation_token]);

  return (
    <div style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }}>
      {error ? (
        <h2 style={{ color: "red" }}>{message}</h2>
      ) : (
        <h2>{message}</h2>
      )}    
    </div>
  )
}