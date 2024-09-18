import useUserContext from "../../hooks/useUserContext";
import Anchor from "./link";

export default function Header() {
  const { user, logout } = useUserContext();

  if (!user)
    return (
      <header className="flex w-full items-center justify-center py-8">
        <nav className="mx-auto flex items-center gap-8">
          <Anchor to={"auth/login"}>Iniciar sesión</Anchor>
          <Anchor to={"auth/register"}>Registrarse</Anchor>
        </nav>
      </header>
    );

  return (
    <header className="header">
      <h1 className="text-2xl font-bold">
        Bienvenido {user && user.username}{" "}
      </h1>
      <nav className="flex items-center justify-between gap-4">
        <button
          onClick={logout}
          className="relative text-lg font-semibold before:bottom-0 before:w-0 before:transition-transform before:duration-200 hover:before:absolute hover:before:h-[2px] hover:before:w-full hover:before:rounded-full hover:before:bg-white hover:before:transition-all"
        >
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
}
