import "./AddCoupon.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, ButtonBase } from "@mui/material";
import { useState } from "react";
import CouponForm from "../../forms/CouponForm/CouponForm";
import { AdminVerbs } from "../../user-specific/admin/AdminVerbs";

function AddCoupon(): JSX.Element {
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    setShowForm(true);
  };

  return showForm ? (
    <Box
      // onClick={handleAdd}
      sx={{
        cursor: "pointer",
        height: "100%",
        border: 1,
        borderColor: "primary.main",
      }}
      className="AddCoupon"
    >
      <CouponForm verb={AdminVerbs.ADD} />
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
}

export default AddCoupon;
