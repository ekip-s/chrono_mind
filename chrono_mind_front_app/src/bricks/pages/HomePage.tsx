import styles from "./HomePage.module.css";
import Button from "../atoms/Button.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { useNavigate } from "react-router";

const HomePage = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const navigate = useNavigate();

  return (
    <section className={styles.homePage}>
      <h4>Что за сайт?</h4>
      <p>
        Сайт для самоорганизации рабочего времени. Вы заносите сюда данные о
        активностях, а сервис анализирует их и предоставляет детальную
        статистику, персонализированные рекомендации и инструменты для повышения
        продуктивности.
      </p>
      {!isAuth && (
        <div className={styles.wrapper}>
          <div className={styles.start}>
            <h4>Хочу уже начать</h4>
            <div className={styles.btnWrapper}>
              <Button
                type="button"
                text="Начать/Войти"
                onClick={() => navigate("/statistics")}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomePage;
