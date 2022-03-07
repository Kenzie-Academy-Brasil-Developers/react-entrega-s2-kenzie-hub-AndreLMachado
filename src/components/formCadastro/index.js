import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import "./style.css";
import { toast } from "react-toastify";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome obrigatorio")
    .matches(`^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÒÖÚÇÑ ]+$`, "nome invalido"),
  email: yup.string().required("Email obrigatorio").email("Email invalido"),
  password: yup
    .string()
    .required("Senha Obrigatoria")
    .matches(
      "^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$",
      "minimo 8 caracteres sendo pelo menos 1 Letra maiuscula, 1  numero e 1 simbolo(#$*@#)"
    ),
  confirmPassword: yup
    .string()
    .required("Senha Obrigatoria")
    .oneOf([yup.ref("password"), null], "As senhas  nao correspondem"),
});

const Form = ({ usuario, setUsuario }) => {
  const history = useHistory();

  const voltarLogin = () => {
    history.push("/");
  };

  const onSubmitFunction = () => {
    console.log(usuario);
    fetch("https://kenziehub.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: usuario.name,
        email: usuario.email,
        password: usuario.password,
        course_module: usuario.select,
        bio: usuario.name,
        contact: usuario.email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status !== "error") {
          toast.success("Cadastro criado com sucesso");
          history.push(`/`);
        } else toast.error("houve algum erro");
      })
      .catch((err) => toast.error(err));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  return (
    <div className="form">
      <div className="title">
        <h3>Kenzie Hub</h3>
        <button className="voltar" onClick={voltarLogin}>
          Voltar
        </button>
      </div>
      <form className="formulario" onSubmit={handleSubmit(onSubmitFunction)}>
        <h4>Crie sua conta</h4>
        <p className="rapido">Rapido e grátis, vamos nessa</p>
        <div className="div-err">
          <span className="span-form">Nome</span>
          <p className="erros">{errors.name?.message}</p>
        </div>
        <input
          className="input-form-cad"
          placeholder="Digite seu nome"
          {...register("name")}
          onChange={(e) => setUsuario({ ...usuario, name: e.target.value })}
        />
        <div className="div-err">
          <span className="span-form">Email</span>
          <p className="erros">{errors.email?.message}</p>
        </div>
        <input
          className="input-form-cad"
          placeholder="Digite seu email"
          {...register("email")}
          onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
        />
        <div className="div-err">
          <span className="span-form">Senha</span>
          <p className="erros">{errors.password?.message}</p>
        </div>
        <input
          className="input-form-cad"
          placeholder="Digite sua senha"
          {...register("password")}
          onChange={(e) => setUsuario({ ...usuario, password: e.target.value })}
        />
        <div className="div-err">
          <span className="span-form">Confirmar senha</span>
          <p className="erros">{errors.confirmPassword?.message}</p>
        </div>
        <input
          className="input-form-cad"
          placeholder="Digite novamente sua senha"
          {...register("confirmPassword")}
        />
        <div className="select">
          <p className="select-mod">Selecionar módulo</p>
          <select
            {...register("select")}
            onChange={(e) => setUsuario({ ...usuario, select: e.target.value })}
          >
            <option>Selecione</option>
            <option value="Primeiro Módulo">Primeiro Módulo</option>
            <option value="Segundo Módulo">Segundo Módulo</option>
            <option value="Terceiro Módulo">Terceiro Módulo</option>
            <option value="Quarto Módulo">Quarto Módulo</option>
          </select>
        </div>
        <button className="cadastrar" type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Form;
