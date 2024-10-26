"use client";

import { useState } from "react";
import { TextField, Button, Alert, Box } from "@mui/material";
import axios from "axios";
import Image from "next/image";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    setError(false);

    if (!email || !password) {
      setStatusMessage("Both fields are required.");
      setError(true);
      return;
    }

    try {
      const response = await axios.post("/api/login", { email, password });
      if (response.data.success) {
        setStatusMessage("Login successful!");
        setError(false);
        // Optionally redirect user after successful login
      } else {
        setStatusMessage("Login failed: " + response.data.message);
        setError(true);
      }
    } catch (err) {
      console.error(err);
      setStatusMessage("An error occurred. Please try again.");
      setError(true);
    }
  };

  return (
    <div className="w-full h-full bg-blue-100 flex items-center">
      <div className="lg:w-[400px] sm:w-[300px] h-[450px] bg-white mx-auto rounded-2xl p-5">
        <div className="flex flex-row mt-2 gap-4">
          <Image width={50} height={50} src={"/mediclined_logo-modified.png"} alt="Logo" />
          <div className="font-bold text-4xl mt-1">Mediclined</div>
        </div>
        <div className="flex flex-col justify-evenly">
          <div className="font-bold text-2xl mt-4 mb-4">Login</div>
          <form className="flex gap-6 flex-col" onSubmit={handleLogin}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              type="email"
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
            >
              Login
            </Button>
          </form>
          {statusMessage && (
            <Box mt={2}>
              <Alert severity={error ? "error" : "success"}>
                {statusMessage}
              </Alert>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
}
