import "./Logo.css";

export default function Logo() {
  return (
    <div className="walfi-logo">
      <img src="/walfi.png" alt="Walfi logo" className="walfi-logo__mark" />
      <span className="walfi-logo__text">Walfi</span>
    </div>
  );
}
