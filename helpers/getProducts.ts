import api from "@/service";

export const getProducts = async () => {
  const { data } = await api.get("/products");
  console.log(data);
  
  return data;
};
