import React, { createContext, useState } from "react";
import { node } from "../../pages/api/baseUrl";

const ClientContext = createContext();

const ClientProvider = ({ children }) => {
  // client state variables
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState(null);
  // client loading state
  const [isAddingClient, setIsAddingClient] = useState(false);
  //error adding client
  const [clientAddedError, setClientAddedError] = useState(false);

  // branch state variables
  const [branches, setBranches] = useState([]);
  // branch/post variables
  const [isAddingBranch, setIsAddingBranch] = useState(false);
  const [branchAddingError, setBranchAddingError] = useState(false);

  // branch/get variables
  const [isFetchingBranches, setIsFetchingBranches] = useState(false);
  const [fetchBranchError, setFetchBranchError] = useState(false);

  //department/get variables
  const [departments, setDepartments] = useState([]);
  const [fetchingDepartments, setFetchingDepartments] = useState(false);
  const [fetchingDepartmentError, setFetchingDepartmentError] = useState(false);

  //department/post variables
  const [department, setDepartment] = useState(null);
  const [isAddingDepartment, setIsAddingDepartment] = useState(false);
  const [addingDepartmentError, setAddingDepartmentError] = useState(false);

  const getDepartments = async (branchId) => {
    try {
      setFetchingDepartments(true);
      const departments = await node.get(`/departments/${branchId}`);
      setDepartments(departments.data);
      setFetchingDepartments(false);
      console.log(departments);
      return departments.data;
    } catch (e) {
      setFetchingDepartments(false);
      setFetchingDepartmentError(true);
      console.log(e);
    }
  };
  const createDepartment = async (data) => {
    try {
      setIsAddingDepartment(true);
      const department = await node.post(`/departments/${data.branchId}`, data);
      setIsAddingDepartment(false);
      getDepartments(data.branchId);
      return department.data;
    } catch (e) {
      setIsAddingDepartment(false);
      setAddingDepartmentError(true);
      console.log(e);
    }
  };

  const createClient = async (data) => {
    try {
      setIsAddingClient(true);
      const client = await node.post("/clients", data);
      setIsAddingClient(false);
      setClient(client.data);
    } catch (e) {
      setIsAddingClient(false);
      setClientAddedError(true);
      console.log(e);
    }
  };

  const getBranches = async (clientId) => {
    try {
      const branches = await node.get(`/branches/${clientId}`);
      setIsFetchingBranches(false);
      setBranches(branches.data);
    } catch (e) {
      setIsFetchingBranches(false);
      setFetchBranchError(true);
      console.log(e);
    }
  };

  const createBranch = async (data, clientId) => {
    try {
      setIsAddingBranch(true);
      const branch = await node.post(`/branches/${clientId}`, data);
      setIsAddingBranch(false);
      getBranches(clientId);
      return branch.data;
    } catch (e) {
      setIsAddingBranch(false);
      setBranchAddingError(true);
      console.log(e);
    }
  };

  return (
    <ClientContext.Provider
      value={{
        client,
        clients,
        isAddingClient,
        clientAddedError,
        createClient,
        setClient,
        createBranch,
        isAddingBranch,
        isFetchingBranches,
        branchAddingError,
        fetchBranchError,
        branches,
        departments,
        fetchingDepartments,
        fetchingDepartmentError,
        getDepartments,
        createDepartment,
        isAddingDepartment,
        addingDepartmentError,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export { ClientContext, ClientProvider };
