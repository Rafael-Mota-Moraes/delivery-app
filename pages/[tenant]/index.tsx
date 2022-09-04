import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import ProductItem from "../../components/ProductItem";
import SearchInput from "../../components/SearchInput";
import { Sidebar } from "../../components/Sidebar";
import { useAppContext } from "../../contexts/app";
import { useAuthContext } from "../../contexts/auth";
import { useApi } from "../../libs/useApi";
import styles from "../../styles/Home.module.css";
import { Product } from "../../types/Product";
import { Tenant } from "../../types/Tenant";
import { User } from "../../types/User";
import NoItemsIcon from "../../public/assets/noItems.svg";

const Home = (data: Props) => {
  const [products, setProducts] = useState<Product[] | null>(data.products);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const { tenant, setTenant } = useAppContext();
  const { setToken, setUser } = useAuthContext();

  useEffect(() => {
    setTenant(data.tenant);
    setToken(data.token);

    if (data.user) {
      setUser(data.user);
    }
  }, []);

  // Search
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>();
  const [searchText, setSearchText] = useState<string>("");
  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  useEffect(() => {
    let newFilteredProducts: Product[] = [];

    for (let product of data.products) {
      if (product.name.toLowerCase().indexOf(searchText?.toLowerCase()) > -1) {
        newFilteredProducts.push(product);
      }
    }
    setFilteredProducts(newFilteredProducts);
  }, [searchText]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerTopLeft}>
            <div className={styles.headerTitle}>Seja Bem-Vindo(a) 👋</div>
            <div className={styles.headerSubtitle}>O que deseja pra hoje?</div>
          </div>
          <div className={styles.headerTopRight}>
            <div
              className={styles.menuButton}
              onClick={() => setSidebarOpen(true)}
            >
              <div
                className={styles.menuButtonLine}
                style={{ backgroundColor: tenant?.mainColor }}
              ></div>
              <div
                className={styles.menuButtonLine}
                style={{ backgroundColor: tenant?.mainColor }}
              ></div>
              <div
                className={styles.menuButtonLine}
                style={{ backgroundColor: tenant?.mainColor }}
              ></div>
            </div>
            <Sidebar
              tenant={data.tenant}
              onClose={() => setSidebarOpen(false)}
              open={sidebarOpen}
            />
          </div>
        </div>
        <div className={styles.headerBottom}>
          <SearchInput onSearch={handleSearch} />
        </div>
      </header>

      {searchText && (
        <>
          <div className={styles.searchText}>
            Procurando por: <strong>{searchText}</strong>
          </div>

          {filteredProducts && filteredProducts.length > 0 && (
            <div className={styles.grid}>
              {filteredProducts.map((item, index) => (
                <ProductItem key={index} data={item} />
              ))}
            </div>
          )}

          {filteredProducts && filteredProducts.length === 0 && (
            <div className={styles.noProducts}>
              <NoItemsIcon color="#e0e0e0" />
              <div className={styles.noProductsText}>
                Ops! Não há itens com este nome
              </div>
            </div>
          )}
        </>
      )}

      {!searchText && (
        <>
          <Banner />
          <div className={styles.grid}>
            {products &&
              products.map((item, index) => (
                <ProductItem key={index} data={item} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

type Props = {
  tenant: Tenant;
  products: Product[];
  token: string;
  user: User | null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;

  const api = useApi(tenantSlug as string);

  // Get Tenant
  const tenant = await api.getTenant();

  // Get Logged User

  const token = getCookie("token", context);

  const user = await api.authorizeToken(token as string);

  if (!tenant) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  // Get Products

  const products = await api.getAllProducts();

  return {
    props: {
      tenant,
      products,
      user,
      token
    }
  };
};
