import React, { useState, useContext, useEffect } from "react";
import { MachineContext } from "../../context/Machines/MachineContext";
import styles from "../../styles/Machine.module.css";
import { isEmpty, startCase } from "lodash";
import { useForm } from "react-hook-form";
import AddBrandModal from "../../components/machine/AddBrandModal";
import AddModelModal from "../../components/machine/AddModelModal";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Link from "next/link";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreateMachine() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      serial: "",
      status: "warehouse/up",
    },
  });
  const [stateBrand, setStateBrand] = useState(null);
  const [stateModel, setStateModel] = useState(null);
  const {
    brands,
    getAllBrands,
    isFetchingBrands,
    fetchingBrandsError,
    filteredModels,
    findModelsByBrand,
    fetchingFilteredModelsError,
    isFetchingFilteredModels,
    machines,
    isFetchingMachines,
    fetchingMachinesError,
    getAllMachines,
    createMachine,
    createdMachine,
    errorCreatingMachine,
    isAddingMachine,
    createBrand,
    creatingBrandError,
    createModel,
    isCreatingModel,
    errorCreatingModel,
  } = useContext(MachineContext);
  const [exposeBrandModal, setExposeBrandModal] = useState(false);
  const [exposeModelModal, setExposeModelModal] = useState(false);
  const [brandError, setBrandError] = useState("");
  const [modelError, setModelError] = useState("");
  const [machineCreated, setMachineCreated] = useState(false);

  useEffect(() => {
    getAllBrands();
  }, []);

  console.log(brands);

  const handleSaveBrand = (data) => {
    const found = brands.some((brand) => brand.name == data);
    if (found) {
      console.log(found);
      return;
    }
    if (!found) {
      createBrand({ name: startCase(data) });
    }
    if (creatingBrandError) {
      setBrandError("Error creating brand.");
      console.log(brandError);
      return;
    } else {
      setExposeBrandModal(false);
    }
  };

  const handleSaveModel = (name, type) => {
    const data = {
      brandId: stateBrand.id,
      name: name,
      type: type,
    };
    const found = filteredModels.some((model) => model.name == data.name);
    if (found) {
      console.log(found);
      return;
    }
    if (!found) {
      createModel(data);
    }
    if (errorCreatingModel) {
      setModelError("Error creating model");
      console.log(modelError);
      return;
    } else {
      setExposeModelModal(false);
    }
  };

  function filterStateBrand(id) {
    const selectedBrand = brands.find((brand) => brand.id == id);
    setStateBrand(selectedBrand);
    findModelsByBrand(id);
  }

  function filterStateModel(id) {
    const selectedModel = filteredModels.find((model) => model.id == id);
    setStateModel(selectedModel);
  }

  function cancelBrandState() {
    setStateBrand(null);
    setStateModel(null);
  }

  const onSubmit = (data) => {
    getAllMachines();
    data.brandId = stateBrand.id;
    data.modelId = stateModel.id;
    data.brandName = stateBrand.name;
    data.modelName = stateModel.name;
    data.type = stateModel.type;

    if (!isEmpty(machines)) {
      const found = machines.some((machine) => machine.serial == data.serial);
      if (found) {
        console.log("Serial number isn't unique.");
        return;
      }
    }
    createMachine(data);
    reset({ serial: "" });
    setMachineCreated(true);

    cancelBrandState();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setMachineCreated(false);
  };

  return (
    <div className={styles.machine}>
      <div className={styles.top}>
        <div className={styles.header}>
          <div className={styles.title}>Add Machine</div>
        </div>
        <Link href="/machines/view/general" passHref>
          <button className={styles.viewmachines}>View Machines</button>
        </Link>
      </div>
      <div className={styles.brandline}>
        <div className={styles.titleline}>
          <div className={styles.brandtitle}>Brands</div>
          <button
            onClick={() => setExposeBrandModal(!exposeBrandModal)}
            className={styles.addbrandbutton}
          >
            Add a brand
          </button>
        </div>
        <hr className={styles.linebreak} />
        {!isFetchingBrands && !isEmpty(brands) && stateBrand == null ? (
          <div className={styles.brandlistcontainer}>
            {brands.map((brand) => {
              return (
                <button
                  onClick={() => filterStateBrand(brand.id)}
                  className={styles.brandlistitem}
                  key={brand.id}
                >
                  <div className={styles.brand}>{brand.name}</div>
                </button>
              );
            })}
          </div>
        ) : !isFetchingBrands && !isEmpty(brands) && stateBrand !== null ? (
          <div className={styles.brandlistcontainer}>
            <button className={styles.brandlistitem}>
              <div className={styles.brand}>{stateBrand?.name}</div>
            </button>
            <div
              onClick={() => cancelBrandState()}
              className={styles.clearbrandstate}
            >
              Cancel
            </div>
          </div>
        ) : isFetchingBrands && isEmpty(brands) ? (
          <div className={styles.brandtitle}>Loading brands...</div>
        ) : !isFetchingBrands && fetchingBrandsError ? (
          <div className={styles.brandtitle}>
            There was a problem fetching the brands. Contact Admin.
          </div>
        ) : !isFetchingBrands && isEmpty(brands) ? (
          <div className={styles.brandtitle}>
            There are no brands in the database. Add one!
          </div>
        ) : (
          ""
        )}
      </div>
      {stateBrand !== null && (
        <div className={styles.brandline}>
          <div className={styles.titleline}>
            <div className={styles.brandtitle}>Models</div>
            <button
              onClick={() => setExposeModelModal(true)}
              className={styles.addbrandbutton}
            >
              Add a model for {stateBrand.name}
            </button>
          </div>
          <hr className={styles.linebreak} />
          {!isEmpty(filteredModels) &&
          !isFetchingFilteredModels &&
          stateModel == null ? (
            <div className={styles.brandlistcontainer}>
              {filteredModels.map((model) => {
                return (
                  <button
                    onClick={() => filterStateModel(model.id)}
                    className={styles.brandlistitem}
                    key={model.id}
                  >
                    <div className={styles.brand}>{model.name}</div>
                  </button>
                );
              })}
            </div>
          ) : isEmpty(filteredModels) &&
            !isFetchingFilteredModels &&
            !fetchingFilteredModelsError ? (
            <div className={styles.brandtitle}>
              No associated models were found for this brand.
            </div>
          ) : fetchingFilteredModelsError ? (
            <div className={styles.brand}>
              There was a problem fetching the models for this brand.
            </div>
          ) : !isFetchingFilteredModels &&
            !isEmpty(filteredModels) &&
            stateModel !== null ? (
            <div className={styles.brandlistcontainer}>
              <button className={styles.brandlistitem}>
                <div
                  className={styles.brand}
                >{`${stateModel?.name} ---- ${stateModel.type}`}</div>
              </button>
              <div
                onClick={() => setStateModel(null)}
                className={styles.clearbrandstate}
              >
                Cancel
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}

      {stateBrand !== null && stateModel !== null ? (
        <div className={styles.brandline}>
          <div className={styles.titleline}>
            <div className={styles.brandtitle}>Details</div>
          </div>
          <hr className={styles.linebreak} />

          <div className={styles.details}>
            <div className={styles.serial}>
              <label className={styles.serialinputlabel} htmlFor="">
                Serial Number
              </label>
              <input
                {...register("serial")}
                className={styles.serialinput}
                type="text"
                placeholder="Serial Number"
              />
            </div>
            <div className={styles.serial}>
              <label className={styles.serialinputlabel} htmlFor="">
                Status
              </label>
              <select className={styles.serialinput} {...register("status")}>
                <option value="warehouse/up">Warehouse/Up</option>
                <option value="warehouse/down">Warehouse/Down</option>
                <option value="client/up">Client/Up</option>
                <option value="client/down">Client/Down</option>
              </select>
            </div>
            <button
              onClick={handleSubmit(onSubmit)}
              className={styles.addmachinebutton}
            >
              Add Machine
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <AddBrandModal
        show={exposeBrandModal}
        onClose={() => setExposeBrandModal(false)}
        onSaveBrand={handleSaveBrand}
      />
      <AddModelModal
        show={exposeModelModal}
        onClose={() => setExposeModelModal(false)}
        brand={stateBrand}
        onSaveModel={handleSaveModel}
      />
      <Snackbar
        open={machineCreated}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity="success">Machine created successfully.</Alert>
      </Snackbar>
    </div>
  );
}

export default CreateMachine;
