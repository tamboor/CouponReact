import { TableRow, TableCell, IconButton, Collapse } from "@mui/material";
import React, { useEffect } from "react";
import { CompanyModel } from "../../../../Models/CompanyModel";
import { AdminVerbs } from "../AdminVerbs";
import "./CompanyRow.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { CouponModel } from "../../../../Models/CouponModel";
import axios, { AxiosError } from "axios";
import CouponTable from "../CouponTable/CouponTable";
import ActionUserForm from "../../../forms/AcionUserForm/ActionUserForm";
import notify from "../../../../utils/Notify";
import getAuthHeaders, { setStoredToken } from "../../../../utils/tokenUtils";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";

interface companySingleProp {
  singleCompany: CompanyModel;
}
function CompanyRow(props: companySingleProp): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [coupons, setCoupons] = React.useState<CouponModel[]>([]);

  const { addCompany, removeCompanyByEmail, updateCompany } = useActions();
  const { admin } = useTypedSelector((state) => state);

  useEffect(() => {
    if (props.singleCompany.id || props.singleCompany.id) {
      return;
    }
    if (admin.companies.indexOf(props.singleCompany) === -1) {
      return;
    }
    axios
      .get(
        `http://localhost:8080/admin/getCompanyByEmail/${props.singleCompany.email}`,
        getAuthHeaders()
      )
      .then((res) => {
        removeCompanyByEmail(props.singleCompany.email);
        addCompany(res.data);
      })
      .catch((err: AxiosError) => {
        //TODO: handle error
      });
  }, []);

  const loadCoupons = () => {
    const url = `http://localhost:8080/admin/getCompanyCoupons/${props.singleCompany.id}`;
    axios
      .get(url, getAuthHeaders())
      .then((response) => {
        setStoredToken(response);
        setCoupons(response.data);
        console.log("setting coupons: ");
      })
      .catch((error: any) => {
        notify.error(error.response.data.description);
        // console.log(error);
      });
  };

  const handleFormSubmit = (data: CompanyModel) => {
    updateCompany(data);
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
          {props.singleCompany.id}
        </TableCell>
        <TableCell>{props.singleCompany.name}</TableCell>
        <TableCell>{props.singleCompany.email}</TableCell>
        {props.singleCompany.id ? (
          <>
            <TableCell>
              <ActionUserForm
                verb={AdminVerbs.UPDATE}
                user={props.singleCompany}
                formType="company"
                updateFunc={handleFormSubmit}
              />
            </TableCell>
            <TableCell>
              <ActionUserForm
                verb={AdminVerbs.DELETE}
                user={props.singleCompany}
                formType="company"
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

export default CompanyRow;
