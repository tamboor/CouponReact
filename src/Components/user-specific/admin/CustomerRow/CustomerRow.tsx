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
    console.log(customer);
  }, []);

  const loadCoupons = () => {
    const url = `http://localhost:8080/admin/getCustomerCoupons/${customer.id}`;
    axios
      .get(url, { headers: { Authorization: token } })
      .then((response) => {
        // console.log(response);
        setCoupons(response.data);
        console.log(coupons);
        // if (response.data) {
        //   setLoad(true);
        // }
      })
      .catch((error: AxiosError) => {
        const err = error.response?.request.responseText;
        const errMessage = JSON.stringify(err);
        console.log(errMessage);

        // setMyError(errMessage.slice(22, 66));

        // setError(true);
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
          <ActionCustomerForm
            verb={AdminVerbs.UPDATE}
            customer={customer}
            updateFunc={handleFormSubmit}
          />
        </TableCell>
        <TableCell>
          <ActionCustomerForm
            verb={AdminVerbs.DELETE}
            customer={customer}
            updateFunc={handleFormSubmit}
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
