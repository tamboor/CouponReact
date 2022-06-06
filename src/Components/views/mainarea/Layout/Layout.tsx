import "./Layout.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

function Layout(): JSX.Element {
  return (
    <div className="Layout">
      {/* <Grid> */}
      <header>
        <Header children={<Main />} />
      </header>
      <br />

      <main>
        <Main />
      </main>

      <footer>
        <Footer />
      </footer>
      {/* </Grid> */}
    </div>
  );
}

export default Layout;
