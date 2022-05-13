import "./AddCustomerForm.css";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import notify from "../../utils/Notify";


interface customerForm {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

function AddCustomerForm(): JSX.Element {
  const state = useTypedSelector((state) => state);
  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem("token") as string;
  const url = "http://localhost:8080/admin/addCustomer";
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //   type forms = customerForm | companyForm;

  // type forms = {};

  const {
    register,
    formState: { errors },
    handleSubmit,
    // } = useForm<customerForm>();
  } = useForm<customerForm>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<customerForm> = async (data) => {
    // console.log("first try");
    await axios
      .post(url, data, { headers: { Authorization: token } })
      .then((res) => {
        const headers = res.headers;
        localStorage.setItem("token", headers.authorization);
        console.log("adding the user to DB");
        navigate("/manage-users");
      })
      .catch((error) => {
        console.log(error.response.status);
        notify.error(error.response.data.description);
        console.log(error);
      });
  };

  return (
    <div className="AddCustomerForm">
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        ADD CUSTOMER
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Add Customer</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText>
              Please enter here the new customer's details:
            </DialogContentText>

            <TextField
              {...register("firstName", { required: "this is required" })}
              label="First Name"
              variant="standard"
            />

            <br />

            <TextField
              {...register("lastName", { required: "this is required" })}
              label="Last Name"
              variant="standard"
            />

            <br />

            <TextField
              {...register("email", { required: "this is required" })}
              label="Email"
              variant="standard"
            />
            <br />
            <TextField
              {...register("password", { required: "this is required" })}
              label="Password"
              variant="standard"
              type="password"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleClose}>
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default AddCustomerForm;
