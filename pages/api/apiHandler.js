import { node } from "./baseUrl";

export const getBrands = async () => await node.get("/brands").then((res) => res.data);
export const getModels = async (brandId) => await node.get(`/models/${brandId}`).then((res) => res.data);
export const addBrand = async (data) => await node.post("/brands", data);
export const deleteBrand = async (brandId) => await node.delete(`/brands/${brandId}`).then((res) => res.data);