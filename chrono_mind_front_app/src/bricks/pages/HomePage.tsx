import styles from "./HomePage.module.css";
import Button from "../atoms/Button.tsx";
import { useKeycloakContext } from "../../auth/useKeycloak.ts";

const HomePage = () => {
  const { loginHandler, isAuth } = useKeycloakContext();

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
                onClick={loginHandler}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomePage;
