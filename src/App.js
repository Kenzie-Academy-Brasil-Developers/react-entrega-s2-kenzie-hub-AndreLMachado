import { useState } from "react";
import "./App.css";
import Form from "./components/formCadastro";
import { Switch, Route } from "react-router-dom";
import Login from "./components/LoginUsuario";
import Home from "./components/home";

function App() {
  const [usuario, setUsuario] = useState({});

  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/">
            <Login usuario={usuario} setUsuario={setUsuario} />
          </Route>
          <Route exact path="/cadastro">
            <Form usuario={usuario} setUsuario={setUsuario} />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
        </Switch>
      </header>
    </div>
  );
}

export default App;
