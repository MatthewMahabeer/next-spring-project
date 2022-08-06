import React, { useState, useImperativeHandle, forwardRef } from "react";
import {
  deleteBrand as removeBrand,
  addBrand as saveBrand,
  addModel as saveModel,
} from "../../../pages/api/apiHandler";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const Modal = (
  { operator, brand, refetchBrands, nullifyBrand, refetchModels },
  ref
) => {
  const [visibilityState, setVisible] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandName, setBrandName] = useState("");
  const [modelName, setModelName] = useState("");
  const [type, setType] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  //implement mutation query to save brand
  const saveBrandMutation = useMutation(saveBrand, {
    onSuccess: () => {
      refetchBrands();
      setVisible(false);
      setBrandName("");
    },
  });
  //implement mutation query to delete brand
  const deleteBrandMutation = useMutation(() => removeBrand(brand.id), {
    onSuccess: () => {
      refetchBrands();
      setVisible(false);
      nullifyBrand();
    },
  });
  //implement mutation query to save model
  const saveModelMutation = useMutation(saveModel, {
    onSuccess: () => {
      refetchModels();
      setVisible(false);
    },
  });

  useImperativeHandle(ref, () => ({
    toggleModal: (brand) => {
      console.log(brand);
      setVisible(!visibilityState);
    },
    close: () => {
      setVisible(false);
      reset();
    },
  }));

  if (!visibilityState) {
    return null;
  }

  return (
    <div className="modal">
      <div
        className={
          operator.mode == "delete"
            ? "modal-content-delete"
            : operator.mode == "add" && operator.operation == "brand"
            ? "modal-content-brand"
            : operator.mode == "add" && operator.operation == "model"
            ? "modal-content-model"
            : ""
        }
      >
        <div onClick={() => setVisible(false)} className="modal-cancel">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <div
          className={
            operator.mode == "add" && operator.operation == "brand"
              ? "modal-brand-header"
              : "modal-header"
          }
        >
          {operator.mode == "delete" &&
            (operator.operation == "brand"
              ? "Are you sure you want to delete this brand?"
              : operator.operation == "model"
              ? "Are you sure you want to delete this model?"
              : "")}
          {operator.mode == "add" &&
            (operator.operation == "brand"
              ? "Add a brand"
              : operator.operation == "model"
              ? `Add a model to ${brand.name}`
              : "")}
        </div>
        <div
          className={
            operator.mode == "add" && operator.operation == "brand"
              ? ""
              : "modal-content-paragraph"
          }
        >
          {operator.mode == "delete" &&
            (operator.operation == "brand"
              ? "This will delete all models associated with this brand."
              : operator.operation == "model"
              ? "This action cannot be undone."
              : "")}
          {operator?.mode == "add" &&
            (operator.operation == "brand" ? (
              <div>
                <div
                  style={{
                    marginTop: "25px",
                    justifyContent: "center",
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <input
                    type="text"
                    className="brand-text-field"
                    placeholder="Brand Name"
                    {...register("name", { required: true })}
                  />
                </div>
                {errors.name && (
                  <p
                    style={{
                      marginTop: "4px",
                      marginBottom: "3px",
                      justifySelf: "center",
                      textAlign: "center",
                      color: "red",
                    }}
                  >
                    Please enter a brand name
                  </p>
                )}
              </div>
            ) : operator.operation == "model" ? (
              <div
                style={{
                  display: "flex",
                  marginTop: "8px",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  size="small"
                  id="model-name"
                  label="Name of Model"
                  variant="outlined"
                  onChange={(e) => setModelName(e.target.value)}
                />
                <FormControl
                  variant="outlined"
                  size="small"
                  sx={{ width: "11rem" }}
                >
                  <InputLabel id="select-label">Type of Printer</InputLabel>
                  <Select
                    // sx={{ marginLeft: "10px" }}
                    labelId="select-label"
                    size="small"
                    id="model-type"
                    label="Type of Printer"
                    variant="outlined"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <MenuItem value="BLACKANDWHITE">Black & White</MenuItem>
                    <MenuItem value="COLOR">Color</MenuItem>
                  </Select>
                </FormControl>
              </div>
            ) : (
              ""
            ))}
        </div>

        <div className="modal-footer">
          <div
            className={
              operator.mode == "add" && operator.operation == "brand"
                ? "add-button-row"
                : "delete-button-row"
            }
          >
            {operator.mode == "delete" && (
              <button
                className="delete-button"
                onClick={deleteBrandMutation.mutate}
              >
                Delete
              </button>
            )}
            {operator.mode == "add" && (
              <button
                className="cancel-button"
                onClick={
                  operator.operation == "brand"
                    ? handleSubmit(saveBrandMutation.mutate)
                    : //() => saveBrandMutation.mutate({ name: brandName.trim() })
                    operator.operation == "model"
                    ? () =>
                        saveModelMutation.mutate({
                          brandId: brand.id,
                          name: modelName,
                          type: type,
                        })
                    : ""
                }
              >
                Save
              </button>
            )}
            <button className="cancel-button" onClick={() => setVisible(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(Modal);
