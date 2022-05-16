import "./ActionCustomerForm.css";
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
import notify from "../../../utils/Notify";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { AdminVerbs } from "../../admin/AdminVerbs";
import { CustomerModel } from "../../../Models/CustomerModel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
interface actionProps {
  verb: AdminVerbs;
  customer?: CustomerModel;
  updateFunc?: Function;
}
interface customerForm {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

function ActionCustomerForm(props: actionProps): JSX.Element {
  const state = useTypedSelector((state) => state);
  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem("token") as string;
  const renderURL = () => {
    switch (props.verb) {
      case AdminVerbs.ADD:
        return "http://localhost:8080/admin/addCustomer";
      case AdminVerbs.UPDATE:
        return "http://localhost:8080/admin/updateCustomer";
      case AdminVerbs.DELETE:
        return `http://localhost:8080/admin/deleteCustomer/${props.customer?.id}`;
    }
  };
  const url = renderURL();

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

  // const updateRow = () => {
  //   props.updateFunc(data)
  // };

  const onSubmit: SubmitHandler<customerForm> = async (data) => {
    switch (props.verb) {
      case AdminVerbs.ADD:
        await axios
          .post(url, { ...data, id: 0 }, { headers: { Authorization: token } })
          .then((res) => {
            const headers = res.headers;
            localStorage.setItem("token", headers.authorization);
            console.log("adding the customer to DB");
            navigate("/manage-users");
          })
          .catch((error) => {
            console.log(error.response.status);
            notify.error(error.response.data.description);
            console.log(error);
          });
        break;
      case AdminVerbs.UPDATE:
        await axios
          .put(
            url,
            {
              ...data,
              id: props.customer?.id,
              email: props.customer?.email,
            },
            { headers: { Authorization: token } }
          )
          .then((res) => {
            const headers = res.headers;
            localStorage.setItem("token", headers.authorization);
            console.log("updating the customer in DB");
            // navigate("/manage-users");
            // props.updateFunc?(data as CustomerModel);
            (props.updateFunc as Function)(data as CustomerModel);
          })
          .catch((error) => {
            console.log(error.response.status);
            notify.error(error.response.data.description);
            console.log(error);
          });
        break;
      case AdminVerbs.DELETE:
        await axios
          .delete(url, { headers: { Authorization: token } })
          .then((res) => {
            const headers = res.headers;
            localStorage.setItem("token", headers.authorization);
            console.log("deleting the customer from DB");
            // navigate("/manage-users");
            (props.updateFunc as Function)(data as CustomerModel);
          })
          .catch((error) => {
            console.log(error.response.status);
            notify.error(error.response.data.description);
            console.log(error);
          });
        break;
    }
  };

  const actionButtonRenderSwitch = () => {
    switch (props.verb) {
      case AdminVerbs.ADD:
        return (
          <Button variant="outlined" onClick={handleClickOpen}>
            <AddBoxIcon /> ADD CUSTOMER
          </Button>
        );
      case AdminVerbs.UPDATE:
        return (
          //todo: change to update icon
          <Button variant="outlined" onClick={handleClickOpen}>
            <EditIcon />
          </Button>
        );
      case AdminVerbs.DELETE:
        return (
          //todo: change to delete icon
          <Button variant="outlined" onClick={handleClickOpen}>
            <DeleteIcon />
          </Button>
        );
    }
  };

  const dialogRenderSwitch = () => {
    switch (props.verb) {
      case AdminVerbs.ADD:
        return (
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
        );
      case AdminVerbs.UPDATE:
        return (
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle> Update Customer</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogContent>
                <DialogContentText>
                  Please enter the details you wish to update:
                </DialogContentText>

                <TextField
                  {...register("firstName", { required: "this is required" })}
                  label="First Name"
                  variant="standard"
                  defaultValue={props.customer?.firstName}
                />

                <br />

                <TextField
                  {...register("lastName", { required: "this is required" })}
                  label="Last Name"
                  variant="standard"
                  defaultValue={props.customer?.lastName}
                />

                <br />

                <TextField
                  {...register("password", { required: "this is required" })}
                  label="Password"
                  variant="standard"
                  type="password"
                  defaultValue={props.customer?.password}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" onClick={handleClose}>
                  Update
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        );
      case AdminVerbs.DELETE:
        return (
          <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogContent>
                <DialogContentText>
                  Are you sure you wish to delete {props.customer?.firstName}{" "}
                  {props.customer?.lastName}?
                </DialogContentText>
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" onClick={handleClose}>
                  Delete
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        );
    }
  };

  return (
    <div className="AddCustomerForm">
      <br />
      {actionButtonRenderSwitch()}
      {dialogRenderSwitch()}
    </div>
  );
}

export default ActionCustomerForm;
