import { Link, useNavigate } from "react-router-dom";
import useUserContext from "../../core/hooks/useUserContext";
import Input from "../components/input";
import Form from "../components/form";

export default function Register() {
  const { register } = useUserContext();

  const redirect = useNavigate();

  // Handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const result = await register({
      username: formData.get("username"),
      password: formData.get("password"),
      passwordConfirm: formData.get("passwordConfirm"),
    });

    if (result.success) {
      return redirect("/auth/login");
    }

    return alert(result.message);
  };
  return (
    <section className="flex flex-col items-center gap-12">
      <Form onSubmit={handleSubmit}>
        <Input label="Usuario" type="text" name="username" required />
        <Input label="Contraseña" type="password" name="password" required />
        <Input
          label="Confirmar contraseña"
          type="password"
          name="passwordConfirm"
          required
        />
        <button>Registrarse</button>
      </Form>
      <p className="text-center">
        ¿Ya tienes cuenta?{" "}
        <Link className="btn" to="/auth/login">
          Ingresar
        </Link>
      </p>
    </section>
  );
}
