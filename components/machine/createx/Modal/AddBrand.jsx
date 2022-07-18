import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { addBrand } from "../../../../pages/api/apiHandler";
import CircularProgress from "@mui/material/CircularProgress";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";

const AddBrandModal = (props, ref) => {
    const [modalState, setModalState] = useState(false);
    const queryClient = useQueryClient();

    useImperativeHandle(ref, () => ({
        openModal: () => setModalState(true)
    }));


    const { register, handleSubmit, formState: { errors}, reset } = useForm();

    const { isLoading: addBrandLoading, isError: addBrandError, mutate: postBrand } = useMutation(addBrand, {
        onSuccess: () => {
            queryClient.invalidateQueries('brands');
            setModalState(false);
            reset();
        }
    });

    const createBrand = (data) => {
        postBrand(data);
    }

    if (!modalState) return null;

    if(addBrandLoading){
        return ( 
            <div className="modal">
            <div className="modal-content">
        <CircularProgress style={{marginLeft: '50%', marginTop: '10%'}} />
        </div>
        </div>
        )
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div onClick={() => setModalState(false)} className="modal-cancel">
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
                <div className="modal-header">Add Brand</div>
                <div className="modal-body">
          <label className="brandinputlabel" htmlFor="">
            Enter Brand Name
          </label>
          <div style={{display: "block"}}>
          <input
          {...register("name", {required: true})}
          //  onChange={(event) => setBrandName(event.target.value)}
            className="brandinput"
            type="text"
            placeholder="Brand Name"
          />
          {errors.name?.type === 'required' && <p style={{fontSize: '13px', marginTop: '2.5px', color: "red"}} className="error">Brand Name is required</p>}
          </div>
          <button
            onClick={handleSubmit(createBrand)}
            className="brand-save"
          >
            Save Brand
          </button>
        </div>
            </div>
        </div>
    );
}
export default forwardRef(AddBrandModal);