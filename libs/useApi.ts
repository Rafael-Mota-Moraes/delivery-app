export type getTenentResponse = {
  name: string;
  mainColor: string;
  secondColor: string;
};

export const useApi = () => ({
  getTenant: (tenentSlug: string): boolean | getTenentResponse => {
    switch (tenentSlug) {
      case "b7burguer":
        return {
          name: "B7Burguer",
          mainColor: "#ff0000",
          secondColor: "#00ff00"
        };
        break;
      case "b7pizza":
        return {
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
