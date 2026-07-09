import "./Button.css";

export default function Button({
  children,
  onClick,
  disabled = false,
  type = "button",
}) {
  return (
    <button
      className="walfi-button"
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
