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
interface customerSingleProp {
  singleCustomer: CustomerModel;
}
function CustomerRow(props: customerSingleProp): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState<CustomerModel>(
    props.singleCustomer
  );
  const [coupons, setCoupons] = React.useState<CouponModel[]>([]);
  // const token = localStorage.getItem("token") as string;
  //     [] as CustomerModel[]
  //   );

  useEffect(() => {
    if (customer.id) {
      return;
    }
    axios
      .get(
        `http://localhost:8080/admin/getCustomerByEmail/${customer.email}`,
        getAuthHeaders()
      )
      .then((res) => {
        setCustomer(res.data);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  }, []);
  // console.log(customer);
  useEffect(() => {}, []);

  const loadCoupons = () => {
    const url = `http://localhost:8080/admin/getCustomerCoupons/${customer.id}`;
    axios
      .get(url, getAuthHeaders())
      .then((response) => {
        setStoredToken(response);
        setCoupons(response.data);
      })
      .catch((error: any) => {
        notify.error(error.response.data.description);
        console.log(error);
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
        {customer.id ? (
          <>
            <TableCell>
              <ActionUserForm
                verb={AdminVerbs.UPDATE}
                user={customer}
                formType="customer"
                updateFunc={handleFormSubmit}
              />
            </TableCell>
            <TableCell>
              <ActionUserForm
                verb={AdminVerbs.DELETE}
                user={customer}
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
