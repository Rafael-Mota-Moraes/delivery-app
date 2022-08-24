import { useEffect, useState } from "react";
import { useFormatter } from "../../libs/useFormatter";
import styles from "./styles.module.css";

type Props = {
  color: string;
  count: number;
  onUpdateCount: (newCount: number) => void;
  min?: number;
  max?: number;
  small?: boolean;
};

const Quantity = ({ color, count, onUpdateCount, max, min, small }: Props) => {
  const [canRemove, setCanRemove] = useState(false);
  const [canAdd, setCanAdd] = useState(false);

  const formatter = useFormatter();

  useEffect(() => {
    setCanRemove(!min || (min && count > min) ? true : false);
    setCanAdd(!max || (max && count < max) ? true : false);
  }, [count, min, max]);

  const handleRemove = () => {
    if (canRemove) {
      onUpdateCount(count - 1);
    }
  };

  const handleAdd = () => {
    if (canAdd) {
      onUpdateCount(count + 1);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.button}
        onClick={handleRemove}
        style={{
          color: canRemove ? "#fff" : "#96a3ab",
          backgroundColor: canRemove ? color : "#f2f4f5",
          width: small ? "42px" : "28px",
          height: small ? "42px" : "28px"
        }}
      >
        -
      </div>
      <div className={styles.qt} style={{ fontSize: small ? "16px" : "18px" }}>
        {formatter.formatQuantity(count, 2)}
      </div>
      <div
        className={styles.button}
        onClick={handleAdd}
        style={{
          color: canAdd ? "#fff" : "#96a3ab",
          backgroundColor: canAdd ? color : "#f2f4f5",
          width: small ? "42px" : "28px",
          height: small ? "42px" : "28px"
        }}
      >
        +
      </div>
    </div>
  );
};

export default Quantity;
