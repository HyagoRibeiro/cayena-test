import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useTheme } from "../../context/ThemeContext";

import GenericInput from "../GenericInput";
import Button from "../Button";
import { authentication } from "../../services/api";

function LoginPage() {
  const { toggleTheme, theme } = useTheme();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const themeToChange = theme === "dark" ? "Light" : "Dark";

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
      <Button text={themeToChange} onClick={toggleTheme} />
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
        <Button text="Login" onClick={handleLogin} />
      </div>
    </div>
  );
}

export default LoginPage;
