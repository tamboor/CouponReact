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
import { UserModel } from "../../../Models/UserModel";
import getAuthHeaders, { setStoredToken } from "../../../utils/tokenUtils";
import { AdminVerbs } from "../../user-specific/admin/AdminVerbs";
import "./UserForm.css";

interface IFormProps {
  verb: AdminVerbs;
  user?: UserModel;
  userType: string;
  handleClose: Function;
}

function UserForm(props: IFormProps): JSX.Element {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = async (data) => {
    switch (props.verb) {
      case AdminVerbs.ADD:
        axios
          .post(
            "http://localhost:8080/admin/updateCustomer",
            { ...data, id: 0 },
            getAuthHeaders()
          )
          .then((res: AxiosResponse) => {
            setStoredToken(res);
          })
          .catch((error: AxiosError) => {
            console.log(error);
          });
        break;
      case AdminVerbs.UPDATE:
        axios
          .put(
            "http://localhost:8080/admin/updateCustomer",
            { ...data, id: props.user?.id, email: props.user?.email },
            getAuthHeaders()
          )
          .then((res: AxiosResponse) => {
            setStoredToken(res);
          })
          .catch((error: AxiosError) => {
            console.log(error);
          });
        break;
    }
  };

  const renderSwitch = (): JSX.Element => {
    const customerNameFields = (
      <div>
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
      </div>
    );

    const companyNameFields = (
      <TextField
        {...register("name", { required: "this is required" })}
        label="Company Name"
        variant="standard"
      />
    );

    const emailFields = (
      <TextField
        {...register("email", { required: "this is required" })}
        label="Email"
        variant="standard"
      />
    );

    switch (props.verb) {
      case AdminVerbs.ADD:
        switch (props.userType) {
          case "customer":
            return (
              <div>
                {customerNameFields}
                {emailFields}
              </div>
            );
          case "company":
            return (
              <div>
                {companyNameFields}
                {emailFields}
              </div>
            );
        }
        return <div></div>;
      case AdminVerbs.UPDATE:
        switch (props.userType) {
          case "customer":
            return <div>{customerNameFields}</div>;
          case "company":
            return <div>{emailFields}</div>;
        }
        return <div></div>;
    }
    return <div></div>;
  };

  const handleClose = (event: any) => {
    props.handleClose();
  };

  return (
    <div className="UserForm">
      <DialogTitle> Add {props.userType}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
            Please enter here the new {props.userType}'s details:
          </DialogContentText>
          {renderSwitch()}
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
    </div>
  );
}

export default UserForm;
