import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import styles from "./PageMaster.module.css";
import HomePage from "../pages/HomePage.tsx";
import ProtectedRoute from "../../auth/ProtectedRoute.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";

const PageMaster = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.authenticated,
  );

  return (
    <section className={styles.pageMaster}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/education" element={<div>Другая страница</div>} />
          </Route>
        </Routes>
      </Router>
    </section>
  );
};

export default PageMaster;
