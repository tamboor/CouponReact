import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { UserModel } from "../../../Modals/UserModel";
import "./UserPanel.css";

interface UserTypeProps {
  children?: JSX.Element;
  userType: string;
}

interface Column {
  id: "name" | "lastName" | "password" | "id";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: "id",
    label: "id",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "lastName", label: "Last Name", minWidth: 170 },
  {
    id: "password",
    label: "Password",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

interface Data {
  id: Number;
  name: string;
  lastName?: string;
  password: number;
  email: string;
}

function UserPanel(props: UserTypeProps): JSX.Element {
  // const state = useTypedSelector((state) => state);
  const [userDetails, setUserDetails] = useState<UserModel[]>([]);
  const token = localStorage.getItem("token") as string;
  const getAllUrl = "http://localhost:8080/admin/getAll" + props.userType;

  useEffect(() => {
    console.log(getAllUrl);
    console.log(props.userType);
    axios
      .get(getAllUrl, { headers: { Authorization: token } })
      .then((response) => {
        // console.log(response.data);
        setUserDetails(response.data);
      });
  }, []);

  const createData = (user: UserModel) => {
    return {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      password: user.password,
      email: user.email,
    };
  };

  const rows: any[] = [];
  const createRows = (userDetails: UserModel[]) => {
    userDetails.map((user) => rows.push(createData(user)));
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default UserPanel;
