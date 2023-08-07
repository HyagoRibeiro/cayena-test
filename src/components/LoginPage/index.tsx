import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useTheme } from "../../context/ThemeContext";

import GenericInput from "../GenericInput";
import Button from "../Button";
import { authentication } from "../../services/api";
import Switch from "../ToggleButton";

function LoginPage() {
  const { toggleTheme, theme } = useTheme();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isDark = theme === 'dark'

  const handleLogin = async () => {
    const grantType = "password";
    const scope = "web";
    try {
      const response = await authentication.post("/oauth/token", {
        grant_type: grantType,
        scope,
        username,
        password,
      });
      const { access_token } = response.data;
      localStorage.setItem("tokenCayena", access_token);
      navigate("/list-suppliers");
    } catch (error) {
      console.error("Erro ao realizar login:", error);
    }
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className="container">
      <div className="container-switch-login">
      <span>Light</span>
          <Switch onChange={toggleTheme} checked={isDark} />
          <span>Dark</span>
      </div>
      <div className="login">
        <h1>Login Page</h1>
        <GenericInput
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Username"
        />
        <GenericInput
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
        />
        <Button onClick={handleLogin}>Login</Button>
      </div>
    </div>
  );
}

export default LoginPage;
