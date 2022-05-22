import {
  TableRow,
  TableCell,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";
import { useEffect } from "react";
import { UserType } from "../../../../Enum/UserType";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import "./usersTable.css";

interface IUserTableProps {
  type: UserType;
}

function UsersTable(props: IUserTableProps): JSX.Element {
  const { users, admin } = useTypedSelector((state) => state);

  useEffect(() => {}, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead></TableHead>
        <TableBody></TableBody>
      </Table>
    </TableContainer>
  );
}

export default UsersTable;

function customerTopRow(): JSX.Element {
  return (
    <TableRow>
      <TableCell />
      <TableCell>ID</TableCell>
      <TableCell>First name</TableCell>
      <TableCell>Last name</TableCell>
      <TableCell>Email</TableCell>
    </TableRow>
  );
}
function companyTopRow(): JSX.Element {
  return (
    <TableRow>
      <TableCell />
      <TableCell>ID</TableCell>
      <TableCell>Company name</TableCell>
      <TableCell>Email</TableCell>
    </TableRow>
  );
}
