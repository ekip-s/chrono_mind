import styles from "./Button.module.css";

const Button = ({ type, text, className, onClick }: ButtonProps) => {
  const handleClick = type === "button" ? onClick : undefined;

  return (
    <button
      className={`${styles.button} ${[className]}`}
      onClick={handleClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;

interface ButtonProps {
  type: "button" | "submit";
  text: string;
  className?: string;
  onClick?: () => void;
}
