import "./AddCoupon.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, ButtonBase } from "@mui/material";
import { useState } from "react";

function AddCoupon(): JSX.Element {
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    setShowForm(true);
  };

  return showForm ? (
    <p>form goes here </p>
  ) : (
    <Box
      onClick={handleAdd}
      sx={{
        cursor: "pointer",
        height: "100%",
        border: 1,
        borderColor: "primary.main",
      }}
      className="AddCoupon"
    >
      <AddCircleOutlineIcon color="primary" />
    </Box>
  );
}

export default AddCoupon;
