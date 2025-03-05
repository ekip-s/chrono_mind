import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import styles from "./PageMaster.module.css";
import HomePage from "../pages/HomePage.tsx";

const PageMaster = () => {
  return (
    <section className={styles.pageMaster}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/education" element={<div>Другая страница</div>} />
        </Routes>
      </Router>
    </section>
  );
};

export default PageMaster;
