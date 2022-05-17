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
import DeletePrompt from "../DeletePrompt/DeletePrompt";
import { DeleteableEntity } from "../DeleteableEntities";
//TODO: change usertype to enum
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

interface IUserProps {
  verb: AdminVerbs;
  formType: string;
  user?: CompanyForm | CustomerForm;
  updateFunc?: Function;
  deleteFunc?: Function;
  addFunc?: Function;
}
//todo: update contnet on each form

function ActionUserForm(props: IUserProps): JSX.Element {
  const state = useTypedSelector((state) => state);
  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem("token") as string;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
  // console.log("in userform:" + props.user);
  const getTarget = () => {
    switch (props.formType) {
      case "customer":
        return DeleteableEntity.CUSTOMER;
      case "company":
        return DeleteableEntity.COMPANY;
    }
    return DeleteableEntity.CUSTOMER;
  };

  // const handleDelete = () => {
  //   props.deleteFunc
  // };

  return (
    <div className="AddCustomerForm">
      {actionButtonRenderSwitch()}
      <br />
      <Dialog open={open} onClose={handleClose}>
        {props.verb === AdminVerbs.DELETE ? (
          <DeletePrompt
            handleClose={handleClose}
            deleteableID={props.user?.id as number}
            targetType={getTarget()}
            deleteFunc={() => {
              props.deleteFunc?.(props.user?.id);
            }}
          >
            {props.formType}
          </DeletePrompt>
        ) : (
          <UserForm
            verb={props.verb}
            handleClose={handleClose}
            user={props.user}
            userType={props.formType}
            updateFunction={props?.updateFunc}
            addFunction={(data: any) => props.addFunc?.(data)}
          />
        )}
      </Dialog>
    </div>
  );
}

export default ActionUserForm;
