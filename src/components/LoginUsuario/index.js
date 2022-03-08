import "./style.css";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const Login = ({ usuario, setUsuario, setIsLogin }) => {
  const history = useHistory();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/home");
    }
  });

  const newCadastro = () => {
    history.push("/cadastro");
  };

  const onLogin = () => {
    setError(null);
    fetch("https://kenziehub.herokuapp.com/sessions", {
      method: "POST",
      body: JSON.stringify({
        email: usuario.email,
        password: usuario.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.status === "error") {
          setError(response.message);
          toast.error("");
        } else {
          localStorage.setItem("user", JSON.stringify(response.user));
          localStorage.setItem("token", response.token);
          setIsLogin(true);
          history.push(`/home`);
        }
      })
      .catch((err) => console.log(err));
  };

  const { register } = useForm({
    resolver: yupResolver({}),
  });

  return (
    <div className="login">
      <h3>Kenzie Hub</h3>
      <div className="main">
        {error && <p color="red">{error}</p>}
        <h4>Login</h4>
        <span className="span-login">Email</span>
        <input
          className="input-form-cad"
          placeholder="Digite seu email"
          {...register("email")}
          onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
        />
        <span className="span-login">Senha</span>
        <input
          className="input-form-cad"
          placeholder="Digite sua senha"
          {...register("password")}
          onChange={(e) => setUsuario({ ...usuario, password: e.target.value })}
        />
        <button className="btn-entrar" onClick={onLogin}>
          Entrar
        </button>
        <span className="span-cad">Ainda não possui uma conta?</span>
        <button className="cadastro" onClick={newCadastro}>
          Cadastre-se
        </button>
      </div>
    </div>
  );
};

export default Login;
