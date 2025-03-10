import styles from "./App.module.css";
import Header from "./bricks/organisms/Header.tsx";
import Footer from "./bricks/organisms/Footer.tsx";
import AppMenu from "./bricks/organisms/AppMenu.tsx";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router";
import HomePage from "./bricks/pages/HomePage.tsx";
import ProtectedRoute from "./auth/ProtectedRoute.tsx";

const App = () => {
  return (
    <>
      <Router>
        <div className={styles.wrapper}>
          <Header />
          <main className={styles.main}>
            <div className={styles.wrapperMain}>
              <AppMenu />
              <section className={styles.pageMaster}>
                <Routes>
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route element={<ProtectedRoute />}>
                    <Route
                      path="/statistics"
                      element={<div>Другая страница</div>}
                    />
                  </Route>
                </Routes>
              </section>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
};

export default App;
