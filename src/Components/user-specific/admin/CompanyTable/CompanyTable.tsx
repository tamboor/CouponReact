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

interface companyProps {
  companies: CompanyModel[];
  addFunction: Function;
  deleteFunction: Function;
}

function CompanyTable(props: companyProps): JSX.Element {
  const [companies, setCompanies] = React.useState<CompanyModel[]>([]);
  React.useEffect(() => {
    setCompanies(props.companies);
  }, []);
  const handleFormSubmit = (data: CompanyModel) => {
    const newCompanies = companies.filter((c) => c !== data);
    setCompanies(newCompanies);
  };
  // console.log(companies);
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
              deleteFunc={() => props.deleteFunction(company.id)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CompanyTable;
