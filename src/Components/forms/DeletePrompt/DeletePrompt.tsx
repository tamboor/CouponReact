import {
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import axios from "axios";
import { host } from "../../../utils/globals";
import notify from "../../../utils/Notify";
import getAuthHeaders, { setStoredToken } from "../../../utils/tokenUtils";
import { DeleteableEntity } from "../DeleteableEntities";
import "./DeletePrompt.css";

interface PromptProps {
  deleteableID: number;
  children?: React.ReactNode;
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
          return `${host}/admin/deleteCompany/${props.deleteableID}`;
        case DeleteableEntity.CUSTOMER:
          return `${host}/admin/deleteCustomer/${props.deleteableID}`;
        case DeleteableEntity.COUPON:
          return `${host}/company/deleteCoupon/${props.deleteableID}`;
      }
    };
    const url = getUrl() as string;
    axios
      .delete(url, getAuthHeaders())
      .then((res) => {
        setStoredToken(res);
        props.deleteFunc?.();
        handleClose();
      })
      .catch((error) => {
        notify.error(error.response.data.description);
        //TODO: handle error
        console.log(error);
      });
  };
  return (
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
  );
}

export default DeletePrompt;
