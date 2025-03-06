import styles from "./Header.module.css";
import Profile from "../molecules/Profile.tsx";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>Chrono Mind</div>
        <Profile />
      </div>
    </header>
  );
};

export default Header;
