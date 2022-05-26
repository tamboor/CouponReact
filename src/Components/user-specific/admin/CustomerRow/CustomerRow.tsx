import {
  TableRow,
  TableCell,
  IconButton,
  Box,
  Collapse,
  Table,
  TableBody,
  TableHead,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { CustomerModel } from "../../../../Models/CustomerModel";
import { AdminVerbs } from "../AdminVerbs";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./CustomerRow.css";
import { CouponModel } from "../../../../Models/CouponModel";
import axios, { AxiosError } from "axios";
import CouponTable from "../CouponTable/CouponTable";
import ActionUserForm from "../../../forms/AcionUserForm/ActionUserForm";
import notify from "../../../../utils/Notify";
import getAuthHeaders, { setStoredToken } from "../../../../utils/tokenUtils";
import { useActions } from "../../../../hooks/useActions";
interface customerSingleProp {
  singleCustomer: CustomerModel;
}
function CustomerRow(props: customerSingleProp): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [coupons, setCoupons] = React.useState<CouponModel[]>([]);
  const { addCustomer, removeCustomerByEmail } = useActions();
  console.log("customer row: " + props.singleCustomer.id);
  useEffect(() => {
    if (props.singleCustomer.id) {
      return;
    }
    axios
      .get(
        //TODO: change to globals
        `http://localhost:8080/admin/getCustomerByEmail/${props.singleCustomer.email}`,
        getAuthHeaders()
      )
      .then((res) => {
        removeCustomerByEmail(props.singleCustomer.email);
        addCustomer(res.data);
      })
      .catch((err: AxiosError) => {
        //TODO: handle error
      });
  }, []);
  useEffect(() => {}, []);

  const loadCoupons = () => {
    const url = `http://localhost:8080/admin/getCustomerCoupons/${props.singleCustomer.id}`;
    axios
      .get(url, getAuthHeaders())
      .then((response) => {
        setStoredToken(response);
        setCoupons(response.data);
      })
      .catch((error: any) => {
        notify.error(error.response.data.description);
      });
  };
  const handleFormSubmit = (data: CustomerModel) => {
    //TODO: change to update
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              loadCoupons();
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props.singleCustomer.id}
        </TableCell>
        <TableCell>{props.singleCustomer.firstName}</TableCell>
        <TableCell>{props.singleCustomer.lastName}</TableCell>
        <TableCell>{props.singleCustomer.email}</TableCell>
        {props.singleCustomer.id ? (
          <>
            <TableCell>
              <ActionUserForm
                verb={AdminVerbs.UPDATE}
                user={props.singleCustomer}
                formType="customer"
                updateFunc={handleFormSubmit}
              />
            </TableCell>
            <TableCell>
              <ActionUserForm
                verb={AdminVerbs.DELETE}
                user={props.singleCustomer}
                formType="customer"
              />
            </TableCell>
          </>
        ) : null}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <CouponTable coupons={coupons} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default CustomerRow;
