import { Tenant } from "../types/Tenant";

export const useApi = () => ({
  getTenant: (tenentSlug: string): boolean | Tenant => {
    switch (tenentSlug) {
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
  }
});
