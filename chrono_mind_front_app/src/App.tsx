import styles from "./App.module.css";
import Header from "./bricks/organisms/Header.tsx";
import Footer from "./bricks/organisms/Footer.tsx";
import AppMenu from "./bricks/organisms/AppMenu.tsx";
import PageMaster from "./bricks/templates/PageMaster.tsx";

const App = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <Header />
        <main className={styles.main}>
          <div className={styles.wrapperMain}>
            <AppMenu />
            <PageMaster />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
