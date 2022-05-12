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
import notify from "../../utils/Notify";
import "./AddCustomerForm.css";

interface customerForm {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  id?: Number;
}
function AddCustomerForm(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const token = localStorage.getItem("token") as string;
  const url = "http://localhost:8080/admin/addCustomer";
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<customerForm>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<customerForm> = async (data) => {
    await axios
      .post(url, data, { headers: { Authorization: token } })
      .then((res) => {
        const headers = res.headers;
        localStorage.setItem("token", headers.authorization);
        console.log("adding the customer");
        navigate("/manage-users");
      })
      .catch((error) => {
        console.log(error.response.status);
        notify.error(error.response.data.description);
        console.log(error);
      });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Customer</DialogTitle>
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
            <Button type="submit" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default AddCustomerForm;
