import styles from "./AppMenu.module.css";
import MenuIcon from "../../assets/MenuIcon.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { useState } from "react";
import MenuNode from "../templates/MenuNode.tsx";
import addImg from "../../assets/add.svg";
import statistics from "../../assets/statistics.svg";
import profile from "../../assets/profile_2.svg";
import close from "../../assets/close.svg";

const AppMenu = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const [isOpen, setIsOpen] = useState(true);

  const isOpenHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <section className={styles.appMenu}>
      {isAuth && !isOpen && (
        <button className={styles.menuBtn} onClick={isOpenHandler}>
          <MenuIcon className={`${styles.menuIcon} hover-trigger`} />
        </button>
      )}

      {isAuth && isOpen && (
        <ul className={styles.list}>
          <MenuNode
            src={addImg}
            alt="Добавление данных"
            caption="Добавить данные"
          />
          <MenuNode
            src={statistics}
            alt="Статистика"
            caption="Статистика"
            path="/statistics"
          />
          <MenuNode
            src={profile}
            alt="Профиль"
            caption="Профиль"
            path="/profile"
          />
          <MenuNode
            src={close}
            alt="Закрыть меню"
            caption="Закрыть меню"
            onClick={isOpenHandler}
          />
        </ul>
      )}
    </section>
  );
};

export default AppMenu;
