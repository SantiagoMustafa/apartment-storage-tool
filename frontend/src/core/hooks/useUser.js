import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useUser() {
  const [user, setUser] = useState(null);

  const redirect = useNavigate();

  //   Crear un endpoint para iniciar sesión con el token apenas entran al sitio web. -> useEffect
  useEffect(() => {
    fetch("http://localhost:3000/auth/user/loginWithToken", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setUser(response.data);
          return redirect("/");
        }
        console.log(response);
        return redirect("/auth/login");
      })
      .catch((result) => {
        return redirect("/auth/login");
      });
  }, []);

  const register = async ({ username, password, passwordConfirm }) => {
    if (password !== passwordConfirm) {
      return {
        success: false,
        code: "PASSWORD_MISMATCH",
        message: "Las contraseñas no coinciden",
      };
    }

    if (username.length < 3) {
      return {
        success: false,
        code: "USERNAME_TOO_SHORT",
        message: "El nombre de usuario debe tener al menos 3 caracteres",
      };
    }

    return await fetch("http://localhost:3000/auth/user/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        passwordConfirm: passwordConfirm,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setUser(response.data);
        return {
          success: response.success,
          message: response.message,
        };
      })
      .catch((result) => {
        return {
          success: result.success,
          code: result.code,
          message: result.message,
        };
      });
  };

  const login = async ({ username, password }) => {
    return await fetch("http://localhost:3000/auth/user/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setUser(response.data);
        return {
          success: response.success,
          message: response.message,
        };
      })
      .catch((result) => {
        return {
          success: result.status,
          code: result.code,
          message: result.message,
        };
      });
  };

  const logout = () => {
    setUser(null);
    return redirect("/auth/login");
  };

  return { user, register, login, logout };
}
