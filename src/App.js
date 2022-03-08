import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/formCadastro";
import { Switch, Route } from "react-router-dom";
import Login from "./components/LoginUsuario";
import Home from "./components/home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [usuario, setUsuario] = useState({});
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      return setIsLogin(true);
    }
  }, [isLogin]);

  return (
    <div className="App">
      <ToastContainer />
      <header className="App-header">
        <Switch>
          <Route exact path="/">
            <Login
              usuario={usuario}
              setUsuario={setUsuario}
              setIsLogin={setIsLogin}
            />
          </Route>
          <Route exact path="/cadastro">
            <Form usuario={usuario} setUsuario={setUsuario} />
          </Route>
          <Route exact path="/home">
            <Home isLogin={isLogin} setIsLogin={setIsLogin} />
          </Route>
        </Switch>
      </header>
    </div>
  );
}

export default App;
