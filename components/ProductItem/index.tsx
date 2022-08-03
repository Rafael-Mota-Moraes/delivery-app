import Link from "next/link";
import { Product } from "../../types/Product";
import styles from "./styles.module.css";

type Props = {
  data: Product;
  maincolor: string;
  secondColor: string;
};

const ProductItem = ({ data, maincolor, secondColor }: Props) => {
  return (
    <Link href={`/b7burguer/product/${data.id}`}>
      <a className={styles.container}>
        <div
          className={styles.head}
          style={{ backgroundColor: secondColor }}
        ></div>
        <div className={styles.info}>
          <div className={styles.img}>
            <img src={data.image} alt="" />
          </div>
          <div className={styles.catName}>{data.categoryName}</div>
          <div className={styles.name}>{data.name}</div>
          <div className={styles.price} style={{ color: maincolor }}>
            {data.price}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ProductItem;
