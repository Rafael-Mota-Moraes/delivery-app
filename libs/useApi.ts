import { Product } from "../types/Product";
import { Tenant } from "../types/Tenant";
import { User } from "../types/User";

const TEMP_PRODUCT: Product = {
  id: 1,
  image: "/temp/burguer.png",
  categoryName: "tradicional",
  name: "Texas Burguer",
  price: 25.5,
  description:
    "2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal."
};

export const useApi = (tenantSlug: string) => ({
  getTenant: async () => {
    switch (tenantSlug) {
      case "b7burguer":
        return {
          slug: "b7burguer",
          name: "B7Burguer",
          mainColor: "#FB9400",
          secondColor: "#FFF9F2"
        };
        break;
      case "b7pizza":
        return {
          slug: "b7pizza",
          name: "B7Pizza",
          mainColor: "#6AB70A",
          secondColor: "#E0E0E0"
        };
        break;

      default:
        return false;
    }
  },

  getAllProducts: async () => {
    let products = [];

    for (let q = 0; q < 10; q++) {
      products.push(TEMP_PRODUCT);
    }

    return products;
  },

  getProduct: async (id: string) => {
    return TEMP_PRODUCT;
  },

  authorizeToken: async (token: string): Promise<User | false> => {
    if (!token) {
      return false;
    }

    return {
      name: "Rafael",
      email: "rafaelmota622@gmail.com"
    };
  }
});
