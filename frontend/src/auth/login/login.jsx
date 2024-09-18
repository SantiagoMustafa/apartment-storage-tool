import { Link, useNavigate } from "react-router-dom";
import useUserContext from "../../core/hooks/useUserContext";
import Form from "../components/form";
import Input from "../components/input";

export default function Login() {
  const { login } = useUserContext();

  const redirect = useNavigate();

  // Handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const result = await login({
      username: formData.get("username"),
      password: formData.get("password"),
    });

    if (result.success) {
      return redirect("/");
    }

    return alert(result.message);
  };
  return (
    <section className="flex flex-col items-center gap-12">
      <Form onSubmit={handleSubmit}>
        <Input label="Usuario" type="text" name="username" required />
        <Input label="Contraseña" type="password" name="password" required />
        <button>Ingresar</button>
      </Form>
      <p className="text-center">
        ¿No tienes cuenta?{" "}
        <Link className="btn" to="/auth/register">
          Crea una ahora
        </Link>
      </p>
    </section>
  );
}
