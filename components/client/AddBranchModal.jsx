import React, { useEffect, useState } from "react";

const AddBranchModal = (props) => {
  const [branchName, setBranchName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  if (!props.show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content-branch">
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
          Add a branch for {props.client?.name}
        </div>
        <div className="modal-body">
          <div>
            <label className="modelinputlabel" htmlFor="">
              Enter Branch Name
            </label>
            <input
              className="modelinput"
              type="text"
              placeholder="Branch Name"
              onChange={(e) => setBranchName(e.target.value)}
            />
            {props.nameError ? (
              <p className="branchmodalerror">Required field.</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <label className="modelinputlabel" htmlFor="">
              Enter Street Address
            </label>
            <input
              className="modelinput"
              type="text"
              placeholder="Street Address"
              onChange={(e) => setStreetAddress(e.target.value)}
            />
            {props.streetError ? (
              <p className="branchmodalerror">Required field.</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <label className="modelinputlabel" htmlFor="">
              Enter City
            </label>
            <input
              onChange={(e) => setCity(e.target.value)}
              className="modelinput"
              type="text"
              placeholder="City"
            />
            {props.cityError ? (
              <p className="branchmodalerror">Required field.</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="branch-contact-title">Branch Contact</div>
        <div className="branch-flex">
          <div>
            <label className="branch-contact-input-label" htmlFor="">
              First Name
            </label>
            <input
              className="b-c-i-l"
              type="text"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            {props.firstNameError ? (
              <p className="branchmodalerror">Required field.</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <label className="branch-contact-input-label" htmlFor="">
              Last Name
            </label>
            <input
              className="b-c-i-l"
              type="text"
              placeholder="First Name"
              onChange={(e) => setLastName(e.target.value)}
            />
            {props.lastNameError ? (
              <p className="branchmodalerror">Required field.</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <label className="branch-contact-input-label" htmlFor="">
              Email Address
            </label>
            <input
              className="b-c-i-l"
              type="text"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
            {props.emailError ? (
              <p className="branchmodalerror">Required field.</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <label className="branch-contact-input-label" htmlFor="">
              Phone Number
            </label>
            <input
              className="b-c-i-l"
              type="text"
              placeholder="Contact Number"
              onChange={(e) => setPhone(e.target.value)}
            />
            {props.phoneError ? (
              <p className="branchmodalerror">Required field.</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <button
          onClick={() =>
            props.onSaveBranch(
              branchName,
              streetAddress,
              city,
              firstName,
              lastName,
              email,
              phone
            )
          }
          className="branch-save"
        >
          Save Branch
        </button>
      </div>
    </div>
  );
};

export default AddBranchModal;
