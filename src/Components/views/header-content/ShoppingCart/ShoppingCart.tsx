import "./ShoppingCart.css";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { Button } from "@mui/material";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
function ShoppingCart(): JSX.Element {
  const state = useTypedSelector((state) => state);
  //   const [items, setItems] = useState<Number>(0);
  return (
    <Button href="/purchase-coupons">
      <Stack spacing={4} direction="row" sx={{ color: "action.active" }}>
        <Badge
          color="secondary"
          badgeContent={state.users.cart.length}
          max={99}
        >
          <ShoppingCartIcon />
        </Badge>
      </Stack>
    </Button>
  );
}
export default ShoppingCart;
