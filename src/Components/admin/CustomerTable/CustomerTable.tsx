import { AdminPanelSettings } from "@mui/icons-material";
import {
  TableRow,
  TableCell,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { CustomerModel } from "../../../Models/CustomerModel";
import CustomerRow from "../CustomerRow/CustomerRow";
import "./CustomerTable.css";
interface customerProps {
  customers: CustomerModel[];
}

function CustomerTable(props: customerProps): JSX.Element {
  const [customers, setCustomers] = React.useState<CustomerModel[]>([]);
  useEffect(() => {
    setCustomers(props.customers);
  }, []);
  console.log(customers);
  const handleFormSubmit = (data: CustomerModel) => {
    // setCustomers({ ...customers, ...data });
    // const newCustomers = customers.filter((c) => c !== data);
    // setCustomers(newCustomers);
  };
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
          {props.customers.map((customer) => (
            <CustomerRow
              singleCustomer={customer}
              key={customer.id}
              deleteFunc={handleFormSubmit}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomerTable;
