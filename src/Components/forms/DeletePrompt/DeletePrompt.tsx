import {
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import axios from "axios";
import getAuthHeaders, { setStoredToken } from "../../../utils/tokenUtils";
import { DeleteableEntity } from "../DeleteableEntities";
import "./DeletePrompt.css";

interface PromptProps {
  deleteableID: number;
  children: React.ReactNode;
  handleClose: Function;
  targetType: DeleteableEntity;
  deleteFunc?: Function;
}

function DeletePrompt(props: PromptProps): JSX.Element {
  const { handleClose } = props;

  const onClose = () => {
    handleClose();
  };
  const onDelete = () => {
    //TODO:find way to use getter
    //TODO: make a .env file and switch all occurances of localhost:8080 to a global value
    const getUrl = () => {
      switch (props.targetType) {
        case DeleteableEntity.COMPANY:
          return `http://localhost:8080/admin/deleteCompany/${props.deleteableID}`;
        case DeleteableEntity.CUSTOMER:
          return `http://localhost:8080/admin/deleteCustomer/${props.deleteableID}`;
      }
    };
    // console.log((getUrl() as string) + props.deleteableID);
    const url = getUrl() as string;
    axios
      .delete(url, getAuthHeaders())
      .then((res) => {
        setStoredToken(res);
        props.deleteFunc?.();
        handleClose();
      })
      .catch((error) => {
        //TODO: handle error
        console.log(error);
      });
  };
  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    <div>
      <DialogContent>
        <DialogContentText>
          Are you sure you wish to delete {props.children}?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onDelete}>Delete</Button>
      </DialogActions>
    </div>
    // </form>
  );
}

export default DeletePrompt;