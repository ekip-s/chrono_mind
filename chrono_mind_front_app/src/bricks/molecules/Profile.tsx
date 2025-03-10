import styles from "./Profile.module.css";
import profile from "../../assets/profile.svg";
import { useEffect, useRef, useState } from "react";
import { useKeycloakContext } from "../../auth/useKeycloak";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { useNavigate } from "react-router";

const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { logoutHandler } = useKeycloakContext();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const user = useSelector((state: RootState) => state.auth.user);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const profileLogoutHandler = () => {
    navigate("/home");
    logoutHandler();
  };

  if (!isAuth) return;

  return (
    <div className={styles.profileContainer} ref={containerRef}>
      <button
        className={styles.profileBtn}
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="profile-menu"
        type="button"
      >
        <img
          src={profile}
          alt="Аватар профиля"
          className={styles.profileImage}
        />
        <p className={styles.username}>{user?.firstName}</p>
      </button>
      <div
        id="profile-menu"
        className={`${styles.profileMenu} ${
          isMenuOpen ? styles.menuVisible : ""
        }`}
        role="menu"
      >
        <div className={styles.menuItem} role="menuitem">
          <button className={styles.node}>Профиль</button>
          <hr />
          <button className={styles.logout} onClick={profileLogoutHandler}>
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
