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
import ActionCustomerForm from "../../../forms/ActionCustomerForm/ActionCustomerForm";
import { AdminVerbs } from "../AdminVerbs";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./CustomerRow.css";
import { CouponModel } from "../../../../Models/CouponModel";
import axios, { AxiosError } from "axios";
import CouponTable from "../CouponTable/CouponTable";
import ActionUserForm from "../../../forms/AcionUserForm/ActionUserForm";
interface customerSingleProp {
  singleCustomer: CustomerModel;
  deleteFunc: Function;
}
function CustomerRow(props: customerSingleProp): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState<CustomerModel>(
    new CustomerModel()
  );
  const [coupons, setCoupons] = React.useState<CouponModel[]>([]);
  const token = localStorage.getItem("token") as string;
  //     [] as CustomerModel[]
  //   );

  useEffect(() => {
    setCustomer(props.singleCustomer);
    // console.log(customer);
  }, []);

  const loadCoupons = () => {
    const url = `http://localhost:8080/admin/getCustomerCoupons/${customer.id}`;
    axios
      .get(url, { headers: { Authorization: token } })
      .then((response) => {
        setCoupons(response.data);
      })
      .catch((error: AxiosError) => {
        const err = error.response?.request.responseText;
        const errMessage = JSON.stringify(err);
      });
  };
  const handleFormSubmit = (data: CustomerModel) => {
    setCustomer({ ...customer, ...data });
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
          {customer.id}
        </TableCell>
        <TableCell>{customer.firstName}</TableCell>
        <TableCell>{customer.lastName}</TableCell>
        <TableCell>{customer.email}</TableCell>
        <TableCell>
          <ActionUserForm
            verb={AdminVerbs.UPDATE}
            user={customer}
            formType="customer"
            updateFunc={handleFormSubmit}
            // updateFunc={props.deleteFunc()}
          />
        </TableCell>
        <TableCell>
          <ActionUserForm
            verb={AdminVerbs.DELETE}
            user={customer}
            formType="customer"
            deleteFunc={() => props.deleteFunc?.(props.singleCustomer.id)}
          />
        </TableCell>
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
