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
import "./AddClientForm.css";

interface formProps {
  clientType: string;
}
interface customerForm {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface companyForm {
  email: string;
  name: string;
  password: string;
}

function AddClientForm(props: formProps): JSX.Element {
  const state = useTypedSelector((state) => state);
  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem("token") as string;
  const url = "http://localhost:8080/admin/add" + props.clientType;
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  type forms = customerForm | companyForm;

  const {
    register,
    formState: { errors },
    handleSubmit,
    // } = useForm<customerForm>();
  } = useForm<forms>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<forms> = async (data) => {
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
    <div>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        ADD {props.clientType}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Add {props.clientType}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText>
              Please enter here the new {props.clientType}'s details:
            </DialogContentText>
            {props.clientType === "Customer" && (
              <TextField
                {...register("firstName", { required: "this is required" })}
                label="First Name"
                variant="standard"
              />
            )}

            {props.clientType === "Customer" && <br />}
            {props.clientType === "Customer" && (
              <TextField
                {...register("lastName", { required: "this is required" })}
                label="Last Name"
                variant="standard"
              />
            )}

            {props.clientType === "Customer" && <br />}

            {props.clientType === "Company" && (
              <TextField
                {...register("name", { required: "this is required" })}
                label="Name"
                variant="standard"
              />
            )}
            {props.clientType === "Company" && <br />}
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

export default AddClientForm;
