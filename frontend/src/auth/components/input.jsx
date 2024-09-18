import "../css/input.css";

export default function Input({ label, type, name, min, max, required }) {
  return (
    <div className="input-field">
      <input type={type} name={name} min={min} max={max} required={required} />
      <label>{label}</label>
    </div>
  );
}
