import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { userContext } from "../../App";
import "./Shipment.css";

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className="shipment-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="shipment-form-input"
        defaultValue={loggedInUser.name}
        {...register("name", { required: true })}
      />
      {errors.name && <span className="error">This field is required</span>}

      <input
        className="shipment-form-input"
        defaultValue={loggedInUser.email}
        {...register("email", { required: true })}
      />
      {errors.email && <span className="error">This field is required</span>}

      <input
        className="shipment-form-input"
        {...register("address", { required: true })}
      />
      {errors.address && <span className="error">This Email is required</span>}

      <input type="submit" />
    </form>
  );
};

export default Shipment;
