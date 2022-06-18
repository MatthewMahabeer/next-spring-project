import React, { useContext, useState, useEffect } from "react";
import styles from "../../styles/Client.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ClientContext } from "../../context/Clients/ClientContext";
import AddBranchModal from "../../components/client/AddBranchModal";
import { isEmpty } from "lodash";
import AddDepartmentModal from "../../components/client/AddDepartmentModal";
import { MachineContext } from "../../context/Machines/MachineContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const schema = yup
  .object({
    clientName: yup.string().required(),
    mainContactFirstName: yup
      .string("Required field.")
      .required("Required field"),
    mainContactLastName: yup
      .string("Required field.")
      .required("Required field"),
    mainContactEmail: yup
      .string()
      .email("Must be a valid email address.")
      .required("Required field."),
    mainContactPhone: yup.string().required("Required field."),
    accountsContactFirstName: yup.string().optional(),
    accountsContactLastName: yup.string().optional(),
    accountsContactEmail: yup
      .string()
      .email("Must be a valid email address.")
      .optional(),
    accountsContactPhone: yup.string().optional(),
    serviceContactFirstName: yup.string().optional(),
    serviceContactLastName: yup.string().optional(),
    serviceContactEmail: yup
      .string()
      .email("Must be a valid email address.")
      .optional(),
    serviceContactPhone: yup.string().optional(),
  })
  .required();

function CreateClient() {
  const [exposeBranchModal, setExposeBranchModal] = useState(false);
  const [exposeDepartmentModal, setExposeDepartmentModal] = useState(false);
  const [stateBranchError, setStateBranchError] = useState(false);
  const [stateStreetError, setStateStreetError] = useState(false);
  const [stateCityError, setStateCityError] = useState(false);
  const [stateFirstNameError, setStateFirstNameError] = useState(false);
  const [stateLastNameError, setStateLastNameError] = useState(false);
  const [stateEmailError, setStateEmailError] = useState(false);
  const [statePhoneError, setStatePhoneError] = useState(false);
  const [branchChosen, setBranchChosen] = useState(false);
  const [clickedBranch, setClickedBranch] = useState(null);
  const [stateDepartmentError, setStateDepartmentError] = useState(false);
  const [stateMachineError, setStateMachineError] = useState(false);
  const [clientCreated, setClientCreated] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const {
    client,
    isAddingClient,
    clientAddedError,
    createClient,
    setClient,
    createBranch,
    isAddingBranch,
    isFetchingBranch,
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
  } = useContext(ClientContext);
  const {
    getMachineBySerial,
    machine,
    setMachine,
    isFetchingMachine,
    fetchingMachineError,
  } = useContext(MachineContext);

  const findMachine = (serial) => {
    getMachineBySerial(serial);
  };

  const onSaveDepartment = (name, machineId) => {
    setStateDepartmentError(false);
    setStateMachineError(false);
    const nameError = name == "";
    const machineError = machineId == "" || machineId == null;
    if (nameError || machineError) {
      if (nameError) {
        setStateDepartmentError(true);
      }
      if (machineError) {
        setStateMachineError(true);
      }
      return;
    }
    const data = {
      name: name,
      branchId: clickedBranch?.id,
      clientId: client?.id,
      machineId: machineId,
    };
    createDepartment(data);
    getDepartments(clickedBranch.id);
    setExposeDepartmentModal(false);
    setMachine(null);
  };

  const onStartUp = () => {
    setStateBranchError(false);
    setStateCityError(false);
    setStateStreetError(false);
    setStateFirstNameError(false);
    setStateLastNameError(false);
    setStateEmailError(false);
    setStatePhoneError(false);
  };
  const onSaveBranch = (
    branchName,
    streetAddress,
    city,
    firstName,
    lastName,
    email,
    phone
  ) => {
    onStartUp();
    const branchError = branchName == "";
    const streetError = streetAddress == "";
    const cityError = city == "";
    const firstNameError = firstName == "";
    const lastNameError = lastName == "";
    const emailError = email == "";
    const phoneError = phone == "";

    if (
      branchError ||
      streetError ||
      cityError ||
      firstNameError ||
      lastNameError ||
      emailError ||
      phoneError
    ) {
      if (branchError) {
        setStateBranchError(true);
      }
      if (streetError) {
        setStateStreetError(true);
      }
      if (cityError) {
        setStateCityError(true);
      }
      if (firstNameError) {
        setStateFirstNameError(true);
      }
      if (lastNameError) {
        setStateLastNameError(true);
      }
      if (emailError) {
        setStateEmailError(true);
      }
      if (phoneError) {
        setStatePhoneError(true);
      }
      return;
    }
    const data = {
      name: branchName,
      contacts: {
        mainContactFirstName: firstName,
        mainContactLastName: lastName,
        mainContactEmail: email,
        mainContacPhone: phone,
      },
      address: {
        street: streetAddress,
        city: city,
      },
    };
    createBranch(data, client.id);
    setExposeBranchModal(false);
    return;
  };

  const onCloseDepartmentModal = () => {
    setExposeDepartmentModal(false);
    setMachine(null);
    setStateDepartmentError(false);
    setStateMachineError(false);
  };

  function selectedBranch(branch) {
    if (!branch) {
      console.log("No branch ID");
      return;
    } else {
      getDepartments(branch.id);
      setBranchChosen(true);
      setClickedBranch(branch);
    }
  }

  const onClose = () => {
    onStartUp();
    setExposeBranchModal(false);
  };
  const onSubmitClient = (clientDetails) => {
    const data = {
      name: clientDetails.clientName,
      contacts: {
        mainContactFirstName: clientDetails.mainContactFirstName,
        mainContactLastName: clientDetails.mainContactLastName,
        mainContactEmail: clientDetails.mainContactEmail,
        mainContactPhone: clientDetails.mainContactPhone,
        accountsContactFirstName: clientDetails.accountsContactFirstName,
        accountsContactLastName: clientDetails.accountsContactLastName,
        accountsContactEmail: clientDetails.accountsContactEmail,
        accountsContactPhone: clientDetails.accountsContactPhone,
        serviceContactFirstName: clientDetails.serviceContactFirstName,
        serviceContactLastName: clientDetails.serviceContactLastName,
        serviceContactEmail: clientDetails.serviceContactEmail,
        serviceContactPhone: clientDetails.serviceContactPhone,
      },
    };
    createClient(data);
    reset();
    setClientCreated(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setClientCreated(false);
  };

  return (
    <div className={styles.client}>
      <div className={styles.body}>
        <div className={styles.top}>
          <div className={styles.title}>Add Client</div>
        </div>
        {client == null ? (
          <div className={styles.addclientcontainer}>
            <div className={styles.clientnameinputcontainer}>
              <label className={styles.cnilabel} htmlFor="">
                Client Name
              </label>
              <input
                className={styles.cninput}
                type="text"
                placeholder="Name of Client"
                {...register("clientName")}
              />
              <p>{errors.clientName?.message}</p>
            </div>
            <div className={styles.innerclientcontainer}>
              <div className={styles.maincontacttitle}>
                Main Contact Details (Required)
              </div>
              <div className={styles.maincontactinputcontainer1}>
                <div className={styles.maincontactinputcontainer}>
                  <label className={styles.maincontactinputlabel} htmlFor="">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className={styles.maincontactinput}
                    {...register("mainContactFirstName")}
                  />
                  <p>{errors.mainContactFirstName?.message}</p>
                </div>
                <div className={styles.maincontactinputcontainer}>
                  <label className={styles.maincontactinputlabel} htmlFor="">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className={styles.maincontactinput}
                    {...register("mainContactLastName")}
                  />
                  <p>{errors.mainContactLastName?.message}</p>
                </div>
                <div className={styles.maincontactinputcontainer}>
                  <label className={styles.maincontactinputlabel} htmlFor="">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="Email"
                    className={styles.maincontactinput}
                    {...register("mainContactEmail")}
                  />
                  <p>{errors.mainContactEmail?.message}</p>
                </div>
                <div className={styles.maincontactinputcontainer}>
                  <label className={styles.maincontactinputlabel} htmlFor="">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className={styles.maincontactinput}
                    {...register("mainContactPhone")}
                  />
                  <p>{errors.mainContactPhone?.message}</p>
                </div>
              </div>
            </div>
            <div className={styles.innerclientcontainer}>
              <div className={styles.maincontacttitle}>
                Accounts Contact Details (Optional)
              </div>
              <div className={styles.maincontactinputcontainer1}>
                <div className={styles.maincontactinputcontainer}>
                  <label className={styles.maincontactinputlabel} htmlFor="">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className={styles.maincontactinput}
                    {...register("accountsContactFirstName")}
                  />
                  <p>{errors.accountsContactFirstName?.message}</p>
                </div>
                <div className={styles.maincontactinputcontainer}>
                  <label className={styles.maincontactinputlabel} htmlFor="">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className={styles.maincontactinput}
                    {...register("accountsContactLastName")}
                  />
                  <p>{errors.accountsContactLastName?.message}</p>
                </div>
                <div className={styles.maincontactinputcontainer}>
                  <label className={styles.maincontactinputlabel} htmlFor="">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="Email"
                    className={styles.maincontactinput}
                    {...register("accountsContactEmail")}
                  />
                  <p>{errors.accountsContactEmail?.message}</p>
                </div>
                <div className={styles.maincontactinputcontainer}>
                  <label className={styles.maincontactinputlabel} htmlFor="">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Phone Numberrrr"
                    className={styles.maincontactinput}
                    {...register("accountsContactPhone")}
                  />
                  <p>{errors.accountsContactPhone?.message}</p>
                </div>
              </div>
            </div>
            <div className={styles.innerclientcontainer}>
              <div className={styles.maincontacttitle}>
                Service Contact Details (Optional)
              </div>
              <div className={styles.maincontactinputcontainer1}>
                <div className={styles.maincontactinputcontainer}>
                  <label className={styles.maincontactinputlabel} htmlFor="">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className={styles.maincontactinput}
                    {...register("serviceContactFirstName")}
                  />
                  <p>{errors.serviceContactFirstName?.message}</p>
                </div>
                <div className={styles.maincontactinputcontainer}>
                  <label className={styles.maincontactinputlabel} htmlFor="">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className={styles.maincontactinput}
                    {...register("serviceContactLastName")}
                  />
                  <p>{errors.serviceContactLastName?.message}</p>
                </div>
                <div className={styles.maincontactinputcontainer}>
                  <label className={styles.maincontactinputlabel} htmlFor="">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="Email"
                    className={styles.maincontactinput}
                    {...register("serviceContactEmail")}
                  />
                  <p>{errors.serviceContactEmail?.message}</p>
                </div>
                <div className={styles.maincontactinputcontainer}>
                  <label className={styles.maincontactinputlabel} htmlFor="">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className={styles.maincontactinput}
                    {...register("serviceContactPhone")}
                  />
                  <p>{errors.serviceContactPhone?.message}</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleSubmit(onSubmitClient)}
              className={styles.addaccountscontactbutton}
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <div className={styles.sctcontainer}>
              <span className={styles.stateclienttitle}>{client?.name}</span>
            </div>
            <div className={styles.modulerow}>
              <div>
                <div className={styles.btitlec}>
                  <div className={styles.btitle}>Branches</div>
                  <button
                    onClick={() => setExposeBranchModal(true)}
                    className={styles.baddbutton}
                  >
                    Add Branch
                  </button>
                </div>
                <div className={styles.branchlist}>
                  {isEmpty(branches) &&
                  !isFetchingBranch &&
                  !fetchBranchError ? (
                    <div className={styles.branchempty}>No branches found.</div>
                  ) : !isEmpty(branches) &&
                    !fetchBranchError &&
                    !isFetchingBranch ? (
                    <div>
                      {branches.map((branch) => {
                        return (
                          <div
                            onClick={() => selectedBranch(branch)}
                            on
                            className={
                              clickedBranch?.id == branch?.id
                                ? styles.blistitem2
                                : styles.blistitem
                            }
                            key={branch.id}
                          >
                            {branch.name}
                          </div>
                        );
                      })}
                    </div>
                  ) : !isFetchingBranch && fetchBranchError ? (
                    <div>There was a problem fetching branches.</div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {branchChosen && (
                <div>
                  <div className={styles.btitlec}>
                    <div className={styles.btitle}>Departments</div>
                    <button
                      onClick={() => setExposeDepartmentModal(true)}
                      className={styles.baddbutton}
                    >
                      Add Department
                    </button>
                  </div>
                  <div className={styles.branchlist}>
                    {isEmpty(departments) &&
                    !fetchingDepartmentError &&
                    !fetchingDepartments ? (
                      <div className={styles.branchempty}>
                        No departments found
                      </div>
                    ) : isEmpty(departments) && fetchingDepartments ? (
                      <div>Departments loading</div>
                    ) : !isEmpty(departments) ? (
                      <div>
                        {departments.map((department) => {
                          return (
                            <div
                              className={styles.blistitem}
                              key={department.id}
                            >
                              {department.name}
                            </div>
                          );
                        })}
                      </div>
                    ) : fetchingDepartmentError ? (
                      <div>Fetching department error</div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <AddBranchModal
        show={exposeBranchModal}
        onClose={onClose}
        client={client}
        onSaveBranch={onSaveBranch}
        streetError={stateStreetError}
        cityError={stateCityError}
        nameError={stateBranchError}
        firstNameError={stateFirstNameError}
        lastNameError={stateLastNameError}
        emailError={stateEmailError}
        phoneError={statePhoneError}
      />
      <AddDepartmentModal
        show={exposeDepartmentModal}
        onClose={onCloseDepartmentModal}
        branch={clickedBranch}
        findMachine={findMachine}
        machine={machine}
        onSaveDepartment={onSaveDepartment}
        nameError={stateDepartmentError}
        machineError={stateMachineError}
      />

      <Snackbar
        open={clientCreated}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert severity="success">{client?.name} created successfully</Alert>
      </Snackbar>
    </div>
  );
}

export default CreateClient;
