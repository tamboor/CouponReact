import "./Layout.css";
import Header from "../Header/Header";
import Logo from "../Logo/Logo";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AppBar from "@mui/material/AppBar";
import BottomNavigation from "@mui/material/BottomNavigation";
import Navbar from "../Navbar/Navbar";

function Layout(): JSX.Element {
  return (
    <div className="Layout">
      <header>
        <Header />
      </header>

      {/* <div className="navbar">
                <Navbar />
            </div> */}

      <main>
        <Main />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
