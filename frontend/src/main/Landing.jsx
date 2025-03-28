import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";
const Landing = () => {
  return (
    <div>
      <Header />
      <main className="pt-16 bg-black">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
