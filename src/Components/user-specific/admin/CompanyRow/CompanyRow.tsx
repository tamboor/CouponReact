import { TableRow, TableCell, IconButton, Collapse } from "@mui/material";
import React, { useEffect } from "react";
import { CompanyModel } from "../../../../Models/CompanyModel";
import ActionCompanyForm from "../../../forms/ActionCompanyForm/ActionCompanyForm";
// import { CompanyModel } from "../../../Models/CompanyModel";
// import ActionCompanyForm from "../../forms/ActionCompanyForm/ActionCompanyForm";
import { AdminVerbs } from "../AdminVerbs";
import "./CompanyRow.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { CouponModel } from "../../../../Models/CouponModel";
import axios, { AxiosError } from "axios";
import CouponTable from "../CouponTable/CouponTable";
interface companySingleProp {
  singleCompany: CompanyModel;
  deleteFunc: Function;
}
function CompanyRow(props: companySingleProp): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [company, setCompany] = React.useState<CompanyModel>(
    new CompanyModel()
  );
  const [coupons, setCoupons] = React.useState<CouponModel[]>([]);
  const token = localStorage.getItem("token") as string;
  //     [] as CustomerModel[]
  //   );

  useEffect(() => {
    setCompany(props.singleCompany);
  }, []);

  const loadCoupons = () => {
    const url = `http://localhost:8080/admin/getCompanyCoupons/${company.id}`;
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

  //   const customer = props.singleCustomer;

  const handleFormSubmit = (data: CompanyModel) => {
    setCompany({ ...company, ...data });
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

export default CompanyRow;
