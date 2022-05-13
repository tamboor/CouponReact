import "./AddCompanyForm.css";
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

interface companyForm {
  email: string;
  name: string;
  password: string;
}
function AddCompanyForm(): JSX.Element {
  const state = useTypedSelector((state) => state);
  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem("token") as string;
  const url = "http://localhost:8080/admin/addCompany";
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
  } = useForm<companyForm>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<companyForm> = async (data) => {
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
    <div className="AddCompanyForm">
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        ADD COMPANY
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Add Company</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText>
              Please enter here the new company's details:
            </DialogContentText>

            <TextField
              {...register("email", { required: "this is required" })}
              label="Email"
              variant="standard"
            />
            <br />
            <TextField
              {...register("name", { required: "this is required" })}
              label="First Name"
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

export default AddCompanyForm;
