import Footer from "./components/footer";
import Header from "./components/header";
import Main from "./components/main";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
