import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { CompanyModel } from "../../../Models/CompanyModel";
import { CustomerModel } from "../../../Models/CustomerModel";
import { host } from "../../../utils/globals";
import notify from "../../../utils/Notify";
import getAuthHeaders, { setStoredToken } from "../../../utils/tokenUtils";
import { AdminVerbs } from "../../user-specific/admin/AdminVerbs";
import "./UserForm.css";

interface IFormProps {
  verb: AdminVerbs;
  user?: CompanyForm | CustomerForm;
  userType: string;
  handleClose: Function;
  // updateFunction?: Function;
  // addFunction?: Function;
}

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

//todo: on every form, all fields must be required, ADD/UPDATE buttons can't be available with missing fields.
function UserForm(props: IFormProps): JSX.Element {
  const state = useTypedSelector((state) => state);
  const navigate = useNavigate();

  //todo: move to other component
  const { addCustomer, addCompany, updateCompany, updateCustomer } =
    useActions();

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<CustomerForm | CompanyForm>();

  const onSubmit: SubmitHandler<CustomerForm | CompanyForm> = async (data) => {
    const userTypeUrl =
      props.userType.charAt(0).toUpperCase() + props.userType.slice(1);
    console.log(props.user);

    switch (props.verb) {
      case AdminVerbs.ADD:
        switch (state.users.userRole) {
          case "admin":
            axios
              .post(
                `${host}/admin/add${userTypeUrl}`,
                { ...data, id: 0 },
                getAuthHeaders()
              )
              .then((res: AxiosResponse) => {
                setStoredToken(res);
                switch (props.userType) {
                  case "customer":
                    addCustomer({ ...data } as CustomerModel);
                    break;
                  case "company":
                    addCompany({ ...data } as CompanyModel);
                    break;
                }
              })
              .catch((error: any) => {
                notify.error(error.response.data.description);
              });
            break;
          case "guest":
            axios
              .post(`${host}/guest/register`, { ...data, id: 0 })
              .then((res: AxiosResponse) => {
                setStoredToken(res);
                props.userType === "customer" &&
                  addCustomer({ ...data } as CustomerModel);
                navigate("/loginPage");
              })
              .catch((error: any) => {
                notify.error(error.response.data.description);
                console.log(error);
              });
            break;
        }
        break;
      case AdminVerbs.UPDATE:
        axios
          .put(
            `${host}/admin/update${userTypeUrl}`,
            { ...props.user, ...data },
            getAuthHeaders()
          )
          .then((res: AxiosResponse) => {
            setStoredToken(res);
            switch (props.userType) {
              case "customer":
                updateCustomer({ ...props.user, ...data } as CustomerModel);
                break;
              case "company":
                updateCompany({ ...props.user, ...data } as CompanyModel);
                break;
            }
          })
          .catch((error: any) => {
            notify.error(error.response.data.description);
            console.log({
              ...data,
              id: props.user?.id,
              email: props.user?.email,
            });
            console.log(error);
          });
        break;
    }
  };
  //todo: move password to fields, on UPDATE need to have a default value
  const renderSwitch = (): JSX.Element => {
    const customerNameFields = () => (
      <div>
        <TextField
          {...register("firstName", { required: "this is required" })}
          label="First Name"
          variant="standard"
          defaultValue={(props.user && (props.user as CustomerForm))?.firstName}
        />

        <br />

        <TextField
          {...register("lastName", { required: "this is required" })}
          label="Last Name"
          variant="standard"
          defaultValue={(props.user && (props.user as CustomerForm))?.lastName}
        />
      </div>
    );

    const companyNameFields = () => (
      <TextField
        {...register("name", { required: "this is required" })}
        label="Company Name"
        variant="standard"
      />
    );

    const emailFields = () => (
      <TextField
        {...register("email", { required: "this is required" })}
        label="Email"
        variant="standard"
        defaultValue={props.user?.email}
      />
    );

    switch (props.verb) {
      case AdminVerbs.ADD:
        switch (props.userType) {
          case "customer":
            return (
              <div>
                {customerNameFields()}
                {emailFields()}
              </div>
            );
          case "company":
            return (
              <div>
                {companyNameFields()}
                <br />
                {emailFields()}
              </div>
            );
        }
        return <div></div>;
      case AdminVerbs.UPDATE:
        switch (props.userType) {
          case "customer":
            return <div>{customerNameFields()}</div>;
          case "company":
            return <div>{emailFields()}</div>;
        }
        return <div></div>;
    }
    return <div></div>;
  };

  const handleClose = (event: any) => {
    props.handleClose();
  };

  const onError = (errors: any, e: any) => {
    console.log(getValues());
  };

  return (
    <div className="UserForm">
      {state.users.userRole === "guest" ? (
        <DialogTitle>Register</DialogTitle>
      ) : (
        <DialogTitle>
          {props.verb} {props.userType}
        </DialogTitle>
      )}

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <DialogContent>
          {state.users.userRole === "admin" && (
            <DialogContentText>
              Please enter here the {props.userType}'s details:
            </DialogContentText>
          )}

          {renderSwitch()}
          <br />

          <TextField
            {...register("password", { required: "this is required" })}
            label="Password"
            variant="standard"
            type="password"
            defaultValue={props.user?.password}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {state.users.userRole === "guest" ? (
            <Button type="submit" onClick={handleClose}>
              sign me in!
            </Button>
          ) : (
            <Button type="submit" onClick={handleClose}>
              {props.verb}
            </Button>
          )}
        </DialogActions>
      </form>
    </div>
  );
}

export default UserForm;
