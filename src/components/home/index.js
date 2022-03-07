import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Home = () => {
  const history = useHistory();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
    }

    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const doLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    history.push("/");
  };

  const saveTech = () => {
    //////
    const mock = {
      title: "Hardware",
      status: "Intermediário",
    };

    fetch("https://kenziehub.herokuapp.com/users/techs", {
      method: "POST",
      body: JSON.stringify(mock),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.status === "error") {
          //
        }
        const newTechs = [...user.techs, response];
        const updatedUser = { ...user, techs: newTechs };
        setUser(updatedUser);

        localStorage.setItem("user", JSON.stringify(updatedUser));
      })
      .catch((err) => console.log(err));
  };
  console.log(user);
  return (
    <div>
      <header className="headerHome">
        <h3>Kenzie Hub</h3>
        <button onClick={doLogout} className="btn-sair">
          Sair
        </button>
      </header>

      <div className="newTec">
        <input placeholder="Tecnologia"></input>
        <select>
          <option>Selecione</option>
          <option>Iniciante</option>
          <option>Intermediário</option>
          <option>Avançado</option>
        </select>
        <button onClick={saveTech} className="salvarCard">
          Salvar
        </button>
      </div>

      <p className="comprimento">Olá, {user.name}</p>
      <p>{user.course_module}</p>
      <p>Tecnologias:</p>
      {(user.techs || []).map((tech) => (
        <p>
          {tech.title} - {tech.status}
        </p>
      ))}
    </div>
  );
};

export default Home;
