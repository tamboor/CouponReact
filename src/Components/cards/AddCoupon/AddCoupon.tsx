import "./AddCoupon.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, Grid } from "@mui/material";
import { useState } from "react";
import CouponForm from "../../forms/CouponForm/CouponForm";
import { AdminVerbs } from "../../user-specific/admin/AdminVerbs";

function AddCoupon(): JSX.Element {
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    console.log("add");
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const render = showForm ? (
    <Box
      sx={{
        cursor: "pointer",
        height: "100%",
        border: 1,
        borderColor: "primary.main",
      }}
      className="AddCoupon"
    >
      <CouponForm verb={AdminVerbs.ADD} handleClose={handleCancel} />
    </Box>
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

  return render;
}

export default AddCoupon;
