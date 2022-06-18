import React, { createContext, useState } from "react";
import { node } from "../../pages/api/baseUrl";

const MachineContext = createContext();

const MachineProvider = ({ children }) => {
  const [brands, setBrands] = useState([]);
  const [machines, setMachines] = useState([]);
  const [isFetchingBrands, setIsFetchingBrands] = useState(false);
  const [fetchingBrandsError, setFetchingBrandsError] = useState(false);
  const [filteredModels, setFilteredModels] = useState([]);
  const [isFetchingFilteredModels, setIsFetchingFilteredModels] = useState(
    false
  );
  const [
    fetchingFilteredModelsError,
    setFetchingFilteredModelsError,
  ] = useState(false);
  const [isCreatingBrand, setIsCreatingBrand] = useState(false);
  const [creatingBrandError, setCreatingBrandError] = useState(false);
  const [isFetchingMachines, setIsFetchingMachines] = useState(false);
  const [fetchingMachinesError, setFetchingMachinesError] = useState(false);
  const [IsAddingMachine, setIsAddingMachine] = useState(false);
  const [createdMachine, setCreatedMachine] = useState(null);
  const [errorCreatingMachine, setErrorCreatingMachine] = useState(false);
  const [errorCreatingModel, setErrorCreatingModel] = useState(false);
  const [isCreatingModel, setIsCreatingModel] = useState(false);
  const [isFetchingMachine, setIsFetchingMachine] = useState(false);
  const [fetchingMachineError, setFetchingMachineError] = useState(false);
  const [machine, setMachine] = useState(null);
  const [machineCreated, setMachineCreated] = useState(false);
  const [machineAggregating, setMachineAggregating] = useState(false);
  const [aggregationError, setAggregationError] = useState(false);
  const [aggregatedRes, setAggregatedRes] = useState(null);

  const getAllBrands = async () => {
    try {
      setIsFetchingBrands(true);
      const brands = await node.get("/brands");
      setBrands(brands.data);
      setIsFetchingBrands(false);
      return brands.data;
    } catch (e) {
      setIsFetchingBrands(false);
      setFetchingBrandsError(true);
      console.log(e);
    }
  };

  const createBrand = async (data) => {
    try {
      setCreatedMachine(true);
      await node.post("/brands", data);
      setCreatingBrandError(false);
      setIsCreatingBrand(false);
      getAllBrands();
    } catch (e) {
      setIsCreatingBrand(false);
      setCreatingBrandError(true);
      console.log(e);
    }
  };

  const findModelsByBrand = async (brandId) => {
    try {
      setIsFetchingFilteredModels(true);
      const models = await node.get(`/models/${brandId}`);
      setFilteredModels(models.data);
      setIsFetchingFilteredModels(false);
      return models.data;
    } catch (e) {
      setIsFetchingFilteredModels(false);
      setFetchingFilteredModelsError(true);
      console.log(e);
    }
  };

  const createModel = async (data) => {
    try {
      setIsCreatingModel(true);
      const model = await node.post(`/models/${data.brandId}`, data);
      setIsCreatingModel(false);
      findModelsByBrand(data.brandId);
      return model.data;
    } catch (e) {
      setIsCreatingModel(false);
      setErrorCreatingModel(true);
      console.log(e);
    }
  };

  const getAllMachines = async () => {
    try {
      setIsFetchingMachines(true);
      const machines = await node.get("/machines");
      setMachines(machines.data);
      setIsFetchingMachines(false);
      return machines.data;
    } catch (e) {
      setIsFetchingMachines(false);
      setFetchingMachinesError(true);
      console.log(e);
    }
  };

  const getMachineBySerial = async (serial) => {
    try {
      setIsFetchingMachine(true);
      const machine = await node.get(`/machines/${serial}`);
      setMachine(machine.data);
      setIsFetchingMachine(false);
      console.log(machine.data);
      return machine;
    } catch (e) {
      setIsFetchingMachine(false);
      setFetchingMachineError(true);
      console.log(e);
    }
  };

  const machineAggregation = async () => {
    try {
      setMachineAggregating(true);
      const machineAggregation = await node.get("/machines/agg");
      setAggregatedRes(machineAggregation.data);
      setMachineAggregating(false);
      return machineAggregation.data;
    } catch (e) {
      setMachineAggregating(false);
      setAggregationError(true);
      console.log(e);
      return;
    }
  };

  const createMachine = async (payload) => {
    try {
      setIsAddingMachine(true);
      const machine = await node.post("/machines", payload);
      setCreatedMachine(machine.data);
      return machine;
    } catch (e) {
      setErrorCreatingMachine(true);
      setIsAddingMachine(false);
      console.log(e);
    }
  };

  return (
    <MachineContext.Provider
      value={{
        getAllBrands,
        brands,
        isFetchingBrands,
        fetchingBrandsError,
        findModelsByBrand,
        filteredModels,
        fetchingFilteredModelsError,
        isFetchingFilteredModels,
        getAllMachines,
        machines,
        isFetchingMachines,
        fetchingMachinesError,
        createMachine,
        createdMachine,
        errorCreatingMachine,
        IsAddingMachine,
        createBrand,
        creatingBrandError,
        createModel,
        isCreatingModel,
        errorCreatingModel,
        getMachineBySerial,
        machine,
        isFetchingMachine,
        fetchingMachineError,
        setMachine,
        machineAggregation,
        aggregatedRes,
        aggregationError,
        machineAggregating,
      }}
    >
      {children}
    </MachineContext.Provider>
  );
};

export { MachineContext, MachineProvider };
