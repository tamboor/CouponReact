import "./CompanyTable.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { CompanyModel } from "../../../Models/CompanyModel";
import CompanyRow from "../CompanyRow/CompanyRow";
// import AddCompanyForm from "../../admin/AddCompanyForm";

interface companyProps {
  companies: CompanyModel[];
}

function CompanyTable(props: companyProps): JSX.Element {
  const [companies, setCompanies] = React.useState<CompanyModel[]>([]);
  React.useEffect(() => {
    setCompanies(props.companies);
  }, []);
  const handleFormSubmit = (data: CompanyModel) => {
    // setCustomers({ ...customers, ...data });
    const newCompanies = companies.filter((c) => c !== data);
    setCompanies(newCompanies);
  };
  console.log(companies);
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
          {props.companies.map((company) => (
            <CompanyRow
              singleCompany={company}
              key={company.id}
              deleteFunc={handleFormSubmit}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CompanyTable;
