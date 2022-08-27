import { useRouter } from "next/router";
import { useAuthContext } from "../../contexts/auth";
import { Tenant } from "../../types/Tenant";
import Button from "../Button";
import { SidebarMenuItem } from "../SidebarMenuItem";
import styles from "./styles.module.css";

type Props = {
  tenant: Tenant;
  open: boolean;
  onClose: () => void;
};

export const Sidebar = ({ tenant, open, onClose }: Props) => {
  const { user, setToken } = useAuthContext();

  const router = useRouter();

  return (
    <div className={styles.container} style={{ width: open ? "100vw" : 0 }}>
      <div className={styles.area}>
        <div className={styles.header}>
          <div
            className={styles.loginArea}
            style={{ borderBottomColor: tenant.mainColor }}
          >
            {user && (
              <div className={styles.userInfo}>
                <strong>{`user.name`}</strong>
                Último pedido há X semanas
              </div>
            )}
            {!user && (
              <Button
                color={tenant.mainColor}
                label="Fazer Login"
                onClick={() => router.push(`/${tenant.slug}/login`)}
                fill
              />
            )}
          </div>
          <div
            className={styles.closeBtn}
            style={{ color: tenant.mainColor }}
            onClick={onClose}
          >
            x
          </div>
        </div>
        <div className={styles.line}></div>
      </div>
      <div className={styles.menu}>
        <SidebarMenuItem
          color="#6a7d7b"
          icon="menu"
          label="Cardápio"
          onClick={onClose}
        />
        <SidebarMenuItem
          color="#6a7d7b"
          icon="cart"
          label="Sacola"
          onClick={() => router.push(`/${tenant.slug}/cart`)}
        />
        <SidebarMenuItem
          color="#6a7d7b"
          icon="fav"
          label="Favoritos"
          onClick={() => {}}
          disabled
        />
        <SidebarMenuItem
          color="#6a7d7b"
          icon="orders"
          label="Meus Pedidos"
          onClick={() => router.push(`/${tenant.slug}/orders`)}
        />
        <SidebarMenuItem
          color="#6a7d7b"
          icon="config"
          label="Configurações"
          onClick={() => {}}
          disabled
        />
      </div>
      <div className={styles.menuBottom}>
        {user && (
          <SidebarMenuItem
            color="#6a7d7b"
            icon="logout"
            label="Sair"
            onClick={() => {
              setToken("");
              onClose();
            }}
          />
        )}
      </div>
    </div>
  );
};
