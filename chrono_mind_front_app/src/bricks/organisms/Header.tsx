import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>Chrono Mind</div>
        <div></div>
      </div>
    </header>
  );
};

export default Header;
