import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { CustomerModel } from "../../../../Models/CustomerModel";
import CustomerRow from "../CustomerRow/CustomerRow";
import "./CustomerTable.css";
interface customerProps {
  customers: CustomerModel[];
}
//todo: move ADD button from "manage users" to here
function CustomerTable(props: customerProps): JSX.Element {
  const handleFormSubmit = (data: CustomerModel) => {};
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID</TableCell>
            <TableCell>First name</TableCell>
            <TableCell>Last name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.customers.map((customer, index) => (
            <CustomerRow singleCustomer={customer} key={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomerTable;
