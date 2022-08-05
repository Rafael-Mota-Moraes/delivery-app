import styles from "./styles.module.css";
import EyeOff from "./EyeOff.svg";
import EyeOn from "./EyeOn.svg";
import { useState } from "react";

type Props = {
  color: string;
  placeholder: string;
  value: string;
  onChange: (newValue: string) => void;
  password?: boolean;
};

const InputField = ({
  color,
  onChange,
  placeholder,
  value,
  password
}: Props) => {
  const [focused, setFocused] = useState(false);
  const [showPassoword, setShowPassword] = useState(false);

  return (
    <div
      className={styles.container}
      style={{
        borderColor: focused ? color : "#f9f9fb",
        backgroundColor: focused ? "#fff" : "#f9f9fb"
      }}
    >
      <input
        type={password ? (showPassoword ? "text" : "password") : "text"}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {password && (
        <div
          className={styles.showPassoword}
          onClick={() => setShowPassword(!showPassoword)}
        >
          {showPassoword && <EyeOn color="#bbb" />}
          {!showPassoword && <EyeOff color="#bbb" />}
        </div>
      )}
    </div>
  );
};

export default InputField;
