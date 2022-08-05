import React, { useState, useImperativeHandle, forwardRef } from "react";
import {
  deleteBrand as removeBrand,
  addBrand as saveBrand,
} from "../../../pages/api/apiHandler";
import { TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

const Modal = ({ operator, brand, refetchBrands, nullifyBrand }, ref) => {
  const [visibilityState, setVisible] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandName, setBrandName] = useState("");
  //implement mutation query to save brand
  const saveBrandMutation = useMutation(() => saveBrand({ name: brandName }), {
    onSuccess: () => {
      refetchBrands();
      setVisible(false);
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

  //Implement try, catch delete brand function here
  // const deleteBrand = async () => {
  //   try {
  //     await removeBrand(brand.id);
  //     refetchBrands();
  //     nullifyBrand();
  //     setVisible(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // //Implement add brand function here
  // const addBrand = async () => {
  //   try {
  //     await saveBrand({ name: brandName });
  //     refetchBrands();
  //     setBrandName("");
  //     nullifyBrand();
  //     setVisible(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //Implement unique delete brand function here

  //Function to delete the selected brand.

  useImperativeHandle(ref, () => ({
    toggleModal: (brand) => {
      console.log(brand);
      setVisible(!visibilityState);
    },
    close: () => {
      setVisible(false);
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
        <div className="modal-header">
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
        <div className="modal-content-paragraph">
          {operator.mode == "delete" &&
            (operator.operation == "brand"
              ? "This will delete all models associated with this brand."
              : operator.operation == "model"
              ? "This action cannot be undone."
              : "")}
          {operator?.mode == "add" &&
            (operator.operation == "brand" ? (
              <div>
                <TextField
                  sx={{ marginTop: "10px" }}
                  size="small"
                  id="brand-name"
                  label="Brand Name"
                  variant="outlined"
                  onChange={(e) => setBrandName(e.target.value)}
                />
              </div>
            ) : operator.operation == "model" ? (
              <div>
                <label htmlFor="">Name of Model</label>
                <input type="text" placeholder="Enter model name" />
                <label htmlFor="">Select Type</label>
                <select>
                  <option value="">Black & White</option>
                  <option value="">Color</option>
                </select>
              </div>
            ) : (
              ""
            ))}
        </div>

        <div className="modal-footer">
          <div className="delete-button-row">
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
                onClick={saveBrandMutation.mutate}
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
