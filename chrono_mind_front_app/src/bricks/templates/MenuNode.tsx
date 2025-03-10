import { useState } from "react";
import styles from "./MenuNode.module.css";

interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption: string;
  path?: string | undefined;
  onClick?: () => void | undefined;
}

const MenuNode = ({
  src,
  alt,
  caption,
  path,
  onClick,
}: ImageWithCaptionProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const currentPath = window.location.pathname;
  const isActive = currentPath === path;

  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${styles.menuNode} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      <img src={src} alt={alt} />
      {isHovered && <div className={styles.caption}>{caption}</div>}
    </li>
  );
};

export default MenuNode;
