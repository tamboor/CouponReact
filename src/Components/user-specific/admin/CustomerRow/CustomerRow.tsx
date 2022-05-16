import { TableRow, TableCell } from "@mui/material";
import React, { useEffect } from "react";
import { CustomerModel } from "../../../../Models/CustomerModel";
import ActionCustomerForm from "../../../forms/ActionCustomerForm/ActionCustomerForm";
import { AdminVerbs } from "../AdminVerbs";
import "./CustomerRow.css";
interface customerSingleProp {
  singleCustomer: CustomerModel;
  deleteFunc: Function;
}
function CustomerRow(props: customerSingleProp): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState<CustomerModel>(
    new CustomerModel()
  );
  //     [] as CustomerModel[]
  //   );

  useEffect(() => {
    setCustomer(props.singleCustomer);
    console.log(customer);
  }, []);

  //   const customer = props.singleCustomer;

  const handleFormSubmit = (data: CustomerModel) => {
    setCustomer({ ...customer, ...data });
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        {/* <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell> */}
        <TableCell />
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
    </React.Fragment>
  );
}

export default CustomerRow;

{
  /* <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                      Coupons
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>Title</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>amount</TableCell>
                          <TableCell>start-date</TableCell>
                          <TableCell>end-date</TableCell>
                          <TableCell align="right">Total price ($)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {company.coupons.map((coupon) => (
                          <TableRow key={coupon.coupon_id}>
                            <TableCell component="th" scope="row">
                              {coupon.title}
                            </TableCell>
                            <TableCell>{coupon.description}</TableCell>
                            <TableCell>{coupon.amount}</TableCell>
                            <TableCell>{coupon.start_date}</TableCell>
                            <TableCell>{coupon.end_date}</TableCell>
                            <TableCell align="right">
                              {coupon.price}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow> */
}
