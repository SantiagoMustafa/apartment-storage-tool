import { Outlet } from "react-router-dom";
import Layout from "./core/layout/layout";
import UserProvider from "./core/provider/UserProvider";

export default function App() {
  return (
    <UserProvider>
      <Layout>
        <Outlet />
      </Layout>
    </UserProvider>
  );
}
