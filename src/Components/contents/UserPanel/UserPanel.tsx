import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Box,
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

function UserPanel(props: UserTypeProps): JSX.Element {
  // const state = useTypedSelector((state) => state);
  const [userDetails, setUserDetails] = useState<UserModel[]>([]);
  const token = localStorage.getItem("token") as string;
  const getAllUrl = "http://localhost:8080/admin/getAll" + props.userType;

  useEffect(() => {
    console.log(getAllUrl);
    console.log("props: " + props.userType);
    axios
      .get(getAllUrl, { headers: { Authorization: token } })
      .then((response) => {
        // console.log(response.data);
        console.log(response.data);
        setUserDetails(response.data);
      });
  }, []);

  return <Paper>this is a {props.userType} box</Paper>;
}

export default UserPanel;
