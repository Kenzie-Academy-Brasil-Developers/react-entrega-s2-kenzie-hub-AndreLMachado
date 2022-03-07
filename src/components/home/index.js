import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "./style.css";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver({}),
  });

  console.log(user);
  return (
    <div>
      <header className="headerHome">
        <h3>Kenzie Hub</h3>
        <button onClick={doLogout} className="btn-sair">
          Sair
        </button>
      </header>

      <p className="comprimento">Olá, {user.name}</p>
      <p>{user.course_module}</p>

      <div className="newTec">
        <input
          placeholder="Tecnologia"
          {...register("tecnologia")}
          onChange={(e) => setUser({ ...user, tecnologia: e.target.value })}
        />
        <select
          {...register("status")}
          onChange={(e) => setUser({ ...user, status: e.target.value })}
        >
          <option>Selecione</option>
          <option value="Iniciante">Iniciante</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Terceiro Módulo">Terceiro Módulo</option>
          <option value="Avançado">Avançado</option>
        </select>

        <button onClick={saveTech} className="salvarCard">
          Salvar
        </button>
      </div>
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
