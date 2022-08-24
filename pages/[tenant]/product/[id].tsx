import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Banner from "../../../components/Banner";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import ProductItem from "../../../components/ProductItem";
import Quantity from "../../../components/Quantity";
import SearchInput from "../../../components/SearchInput";
import { useAppContext } from "../../../contexts/AppContext";
import { useApi } from "../../../libs/useApi";
import { useFormatter } from "../../../libs/useFormatter";
import styles from "../../../styles/Product-id.module.css";
import { Product } from "../../../types/Product";
import { Tenant } from "../../../types/Tenant";

const Product = (data: Props) => {
  const [qtCount, setQtCount] = useState(1);

  const { tenant, setTenant } = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
  }, []);

  const formatter = useFormatter();

  const handleAddToCart = () => {};

  const handleUpdateQt = (newCount: number) => {
    setQtCount(newCount);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>
          {data.product.name} | {data.tenant.name}
        </title>
      </Head>
      <div className={styles.headerArea}>
        <Header
          color={data.tenant.mainColor}
          backHref={`/${data.tenant.slug}`}
          title="Produto"
          invert
        />
      </div>
      <div
        className={styles.headerBg}
        style={{ backgroundColor: data.tenant.mainColor }}
      ></div>
      <div className={styles.productImage}>
        <img src={data.product.image} alt={data.product.name} />
      </div>
      <div className={styles.category}>{data.product.categoryName}</div>
      <div className={styles.title}>{data.product.name}</div>
      <div className={styles.line}>
        <hr />
      </div>

      <div className={styles.description}>{data.product.description}</div>
      <div className={styles.qtText}>Quantidade</div>
      <div className={styles.area}>
        <div className={styles.areaLeft}>
          <Quantity
            color={data.tenant.mainColor}
            count={qtCount}
            onUpdateCount={handleUpdateQt}
            min={1}
            small={true}
          />
        </div>
        <div
          className={styles.areaRight}
          style={{ color: data.tenant.mainColor }}
        >
          {formatter.formatPrice(data.product.price)}
        </div>
      </div>
      <div className={styles.buttonArea}>
        <Button
          color={data.tenant.mainColor}
          label="Adicionar a Sacola"
          onClick={handleAddToCart}
          fill
        />
      </div>
    </div>
  );
};

export default Product;

type Props = {
  tenant: Tenant;
  product: Product;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug, id } = context.query;

  const api = useApi(tenantSlug as string);

  // Get Tenant
  const tenant = await api.getTenant();
  if (!tenant) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  // Get Products

  const product = await api.getProduct(id as string);

  return {
    props: {
      tenant,
      product: product
    }
  };
};
