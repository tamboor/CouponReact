import "./ShoppingCart.css";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
function ShoppingCart(): JSX.Element {
  const [items, setItems] = useState<Number>(0);
  return (
    <Stack spacing={4} direction="row" sx={{ color: "action.active" }}>
      <Badge color="secondary" badgeContent={0} max={99}>
        <ShoppingCartIcon />
      </Badge>
    </Stack>
  );
}
export default ShoppingCart;
