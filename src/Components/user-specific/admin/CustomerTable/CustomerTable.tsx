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
import { CustomerModel } from "../../../../Models/CustomerModel";
import CustomerRow from "../CustomerRow/CustomerRow";
import "./CustomerTable.css";
interface customerProps {
  customers: CustomerModel[];
<<<<<<< HEAD
  // updateFunc: Function;
=======
  addFunction: Function;
  deleteFunction: Function;
>>>>>>> 2d8b2ba2ede4710b511fb2c54d75fc3d77babb3c
}

function CustomerTable(props: customerProps): JSX.Element {
  const [customers, setCustomers] = React.useState<CustomerModel[]>([]);
  useEffect(() => {
    setCustomers(props.customers);
    // props.updateFunc();
  }, []);
<<<<<<< HEAD
  console.log(customers);
  const handleFormSubmit = (data: CustomerModel) => {
    setCustomers({ ...customers, ...data });
    const newCustomers = customers.filter((c) => c !== data);
    setCustomers(newCustomers);
  };
=======

  const handleFormSubmit = (data: CustomerModel) => {};
>>>>>>> 2d8b2ba2ede4710b511fb2c54d75fc3d77babb3c
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
              deleteFunc={() => props.deleteFunction(customer.id)}
              // addFunc={() => props.addFunction(customer.id)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomerTable;
