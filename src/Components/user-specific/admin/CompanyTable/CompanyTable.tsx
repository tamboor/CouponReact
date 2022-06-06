import "./CompanyTable.css";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CompanyRow from "../CompanyRow/CompanyRow";
import { CompanyModel } from "../../../../Models/CompanyModel";
import { invokeFetchCompanies } from "../../../../utils/fetchAdminUsers";

interface companyProps {
  companies: CompanyModel[];
}

function CompanyTable(props: companyProps): JSX.Element {
  React.useEffect(() => {
    console.log("fetching companiesfrom table");
    invokeFetchCompanies();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID</TableCell>
            <TableCell>Company name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.companies.map((company, index) => (
            <CompanyRow singleCompany={company} key={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CompanyTable;
