import { Product } from "../types/Product";
import { Tenant } from "../types/Tenant";

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
          mainColor: "#ff0000",
          secondColor: "#00ff00"
        };
        break;
      case "b7pizza":
        return {
          slug: "b7pizza",
          name: "B7Pizza",
          mainColor: "#0000ff",
          secondColor: "#00ff00"
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
  }
});
