import { TableRow, TableCell } from "@mui/material";
import React, { useEffect } from "react";
import { CompanyModel } from "../../../Modals/CompanyModel";
import ActionCompanyForm from "../ActionCompanyForm/ActionCompanyForm";
import ActionCustomerForm from "../ActionCustomerForm/ActionCustomerForm";
import { AdminVerbs } from "../AdminVerbs";
import "./CompanyRow.css";
interface companySingleProp {
  singleCompany: CompanyModel;
  deleteFunc: Function;
}
function CompanyRow(props: companySingleProp): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [company, setCompany] = React.useState<CompanyModel>(
    new CompanyModel()
  );
  //     [] as CustomerModel[]
  //   );

  useEffect(() => {
    setCompany(props.singleCompany);
  }, []);

  //   const customer = props.singleCustomer;

  const handleFormSubmit = (data: CompanyModel) => {
    setCompany({ ...company, ...data });
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
          {company.id}
        </TableCell>
        <TableCell>{company.name}</TableCell>
        <TableCell>{company.email}</TableCell>
        <TableCell>
          <ActionCompanyForm
            verb={AdminVerbs.UPDATE}
            company={company}
            updateFunc={handleFormSubmit}
          />
        </TableCell>
        <TableCell>
          <ActionCompanyForm
            verb={AdminVerbs.DELETE}
            company={company}
            updateFunc={handleFormSubmit}
          />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default CompanyRow;

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
