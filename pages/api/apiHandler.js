import { node } from "./baseUrl";

export const getBrands = async () => await node.get("/brands");
export const getModels = async (brandId) => await node.get(`/models/${brandId}`);
export const addBrand = async (data) => await node.post("/brands", data);