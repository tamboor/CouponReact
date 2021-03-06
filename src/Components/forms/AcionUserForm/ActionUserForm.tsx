import { Button, Dialog } from "@mui/material";
import React from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { AdminVerbs } from "../../user-specific/admin/AdminVerbs";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./AcionUserForm.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import UserForm from "../UserForm/UserForm";
import DeletePrompt from "../DeletePrompt/DeletePrompt";
import { DeleteableEntity } from "../DeleteableEntities";
import { useActions } from "../../../hooks/useActions";
import { colors } from "../../../utils/colors";
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
  // deleteFunc?: Function;
  // addFunc?: Function;
}
//todo: update contnet on each form

function ActionUserForm(props: IUserProps): JSX.Element {
  const state = useTypedSelector((state) => state);
  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem("token") as string;
  const {
    removeCustomer,
    removeCompany,
    removeCompanyByEmail,
    removeCustomerByEmail,
  } = useActions();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const actionButtonRenderSwitch = () => {
    switch (props.verb) {
      case AdminVerbs.ADD:
        switch (state.users.userRole) {
          case "admin":
            return (
              <Button variant="outlined" onClick={handleClickOpen}>
                <AddBoxIcon /> ADD {props.formType}
              </Button>
            );
          case "guest":
            console.log("here!!!");
            return (
              <Button
                color="inherit"
                onClick={handleClickOpen}
                variant="contained"
                sx={{
                  color: colors.WHITE,
                  backgroundColor: colors.PINK,
                  border: 2,
                  borderColor: colors.PURPLE,
                  margin: 2,
                  "&:hover": { color: "black" },
                }}
              >
                REGISTER
              </Button>
            );
        }
        break;
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
              // props.deleteFunc?.(props.user?.id);
              switch (props.formType) {
                case "customer":
                  console.log("delete customer");
                  if (!props.user?.id) {
                    removeCustomerByEmail(props.user?.email as string);
                    break;
                  }
                  removeCustomer(props.user ? props.user.id : -1);
                  break;
                case "company":
                  // console.log("delete company email");
                  if (!props.user?.id) {
                    removeCompanyByEmail(props.user?.email as string);
                    break;
                  }
                  removeCompany(props.user ? props.user.id : -1);
                  break;
              }
            }}
          >
            {props.formType}
          </DeletePrompt>
        ) : (
          <UserForm
            verb={props.verb}
            handleClose={handleClose}
            user={props?.user}
            userType={props.formType}
            // addFunction={(data: any) => props.addFunc?.(data)}
          />
        )}
      </Dialog>
    </div>
  );
}

export default ActionUserForm;
