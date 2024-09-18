import { UserContext } from "../context/UserContext";
import useUser from "../hooks/useUser";

export default function UserProvider({ children }) {
  const { user, register, login, logout } = useUser();

  return (
    <UserContext.Provider value={{ user, register, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
