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
    const mock = {
      title: user.title,
      status: user.status,
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

  const onSubmitFunction = (data) => {
    console.log(data);
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
        <form className="form-home" onSubmit={handleSubmit(onSubmitFunction)}>
          <input
            className="inp-new-tec"
            placeholder="Tecnologia"
            {...register("title")}
            onChange={(e) => setUser({ ...user, title: e.target.value })}
          />
          <select
            className="select-home"
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
        </form>
      </div>
      <p>Tecnologias:</p>
      {(user.techs || []).map((tech) => (
        <div className="cardTech" key={tech.id}>
          <p>{tech.title}</p>
          <p className="nivel">{tech.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
