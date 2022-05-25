import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionUserForm from "../../../forms/AcionUserForm/ActionUserForm";
import UserForm from "../../../forms/UserForm/UserForm";
import { AdminVerbs } from "../../../user-specific/admin/AdminVerbs";
import "./RegisterButton.css";

function RegisterButton(): JSX.Element {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    navigate("/login");
  };
  return (
    <React.Fragment>
      <ActionUserForm verb={AdminVerbs.ADD} formType="customer" />
    </React.Fragment>
  );
}

export default RegisterButton;
