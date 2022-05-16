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
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { CustomerModel } from "../../../Models/CustomerModel";
import notify from "../../../utils/Notify";
import { AdminVerbs } from "../../user-specific/admin/AdminVerbs";
// import ActionCustomerForm from "../ActionCustomerForm/ActionCustomerForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./AcionUserForm.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import UserForm from "../UserForm/UserForm";

interface CustomerForm {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface CompanyForm {
  id: number;
  email: string;
  name: string;
  password: string;
}

interface IUserProps<T> {
  verb: AdminVerbs;
  formType: string;
  user?: T;
  updateFunc?: Function;
}

function ActionUserForm<T extends CompanyForm | CustomerForm>(
  props: IUserProps<T>
): JSX.Element {
  const state = useTypedSelector((state) => state);
  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem("token") as string;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="AddCustomerForm">
      <br />
      <Dialog open={open} onClose={handleClose}>
        <UserForm verb={props.verb} handleClose={handleClose} userType="" />
      </Dialog>
    </div>
  );
}

export default ActionUserForm;
