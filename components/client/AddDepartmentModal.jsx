import React, { useState } from "react";

const AddDepartmentModal = (props) => {
  const [name, setName] = useState("");
  const [serial, setSerial] = useState("");
  if (!props.show) {
    return null;
  }
  if (props.machine !== null) {
    console.log(props.machine);
  }
  return (
    <div className="modal">
      <div className="modal-content-department">
        <div onClick={props.onClose} className="modal-cancel">
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
          Add a department for the {props.branch?.name} branch
        </div>
        <div className="modal-body">
          <div>
            <label className="modelinputlabel" htmlFor="">
              Enter Department Name
            </label>
            <input
              className="modelinput"
              type="text"
              placeholder="Department Name"
              onChange={(e) => setName(e.target.value)}
            />
            {props.nameError ? (
              <p className="branchmodalerror">Required field.</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="branch-contact-title">Attach a machine</div>
        <div className="branch-flex">
          <div>
            <label className="branch-contact-input-label" htmlFor="">
              Enter Serial Number
            </label>
            <input
              className="serial-find"
              type="text"
              placeholder="Serial Number"
              onChange={(e) => setSerial(e.target.value)}
            />
          </div>
          <button
            onClick={() => props.findMachine(serial)}
            className="department-save"
          >
            Find machine
          </button>
          {props.machineError ? (
            <p className="branchmodalerror">
              A department cannot be configured without a machine.
            </p>
          ) : (
            ""
          )}
        </div>
        {props.machine !== null ? (
          <div className="sctcontainer">
            <span className="machine-found">{props.machine?.brand?.name}</span>
            <span className="machine-found">{props.machine?.model?.name}</span>
          </div>
        ) : (
          ""
        )}
        <button
          onClick={() =>
            props.onSaveDepartment(
              name,
              props.machine !== null ? props.machine.id : null
            )
          }
          className="branch-save"
        >
          Save Department
        </button>
      </div>
    </div>
  );
};

export default AddDepartmentModal;
