import React from "react";
import clsx from "clsx";
import "@/styles/input.css";

const Input = ({
  placeholder,
  type = "text",
  value,
  onChange,
  onKeyDown,
  icon,
  onClear,
}) => {
  return (
    <div className="custom-input-wrapper">
      {icon && <i className={clsx(icon, "custom-input-icon")} />}
      <input
        className={clsx("custom-input", icon && "has-icon")}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {value && onClear && (
        <button
          type="button"
          className="custom-input-clear"
          onClick={onClear}
          aria-label="Clear input"
        >
          <i className="fas fa-times-circle" />
        </button>
      )}
    </div>
  );
};

export default Input;
