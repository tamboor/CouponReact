import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import "./Coupon.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { CouponModel } from "../../../Models/CouponModel";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import React, { useState } from "react";
import { addItem } from "../../../Redux/action-creators";
import { useActions } from "../../../hooks/useActions";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CouponForm from "../../forms/CouponForm/CouponForm";
import { AdminVerbs } from "../../user-specific/admin/AdminVerbs";
import DeleteIcon from "@mui/icons-material/Delete";

import ActionUserForm from "../../forms/AcionUserForm/ActionUserForm";
import DeletePrompt from "../../forms/DeletePrompt/DeletePrompt";
import { DeleteableEntity } from "../../forms/DeleteableEntities";
import EditIcon from "@mui/icons-material/Edit";
import { deleteCoupon } from "../../../utils/fetchCompanyCoupons";
import { colors } from "../../../utils/colors";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

interface couponProps {
  coupon: CouponModel;
  isPurchased: boolean;
  styles?: object;
}

function Coupon(props: couponProps): JSX.Element {
  const { addItem } = useActions();
  const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = useState(false);
  const state = useTypedSelector((state) => state);
  const { removeCoupon } = useActions();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddToCart = (event: any) => {
    addItem(props.coupon);
  };

  const handleEditCoupon = () => {
    console.log("edit");
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  function renderSwitch() {
    switch (state.users.userRole) {
      case "customer":
        return (
          <CardActions
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: colors.LIGHT_BLUE,
            }}
          >
            <Grid container justifyContent={"center"}>
              <Button
                onClick={handleAddToCart}
                disabled={props.isPurchased}
                sx={{ color: colors.PURPLE }}
              >
                ADD TO MY SHOPPING CART{" "}
              </Button>
            </Grid>
          </CardActions>
        );
      case "company":
        return (
          <Box>
            <Button onClick={handleEditCoupon}>
              <EditIcon />
            </Button>
            <Button onClick={handleClickOpen}>
              <DeleteIcon />
            </Button>
          </Box>
        );
    }
  }

  return showForm ? (
    <CouponForm
      verb={AdminVerbs.UPDATE}
      coupon={props.coupon}
      handleClose={handleCancel}
    />
  ) : (
    <React.Fragment>
      <Card
        sx={{
          height: "100%",
          display: "flow",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: "35%",
            paddingTop: "0%",
            paddingBottom: "12%",
          }}
          image={props.coupon.image}
          alt="coupon img"
        />

        <CardContent sx={{ height: "50%" }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Box
                display="flex"
                flexDirection="row"
                alignContent="center"
                justifyContent="flex-start"
                height="10vh"
              >
                <Typography gutterBottom variant="h5" component="h2">
                  {props.coupon.title}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                display="flex"
                flexDirection="row"
                alignContent="center"
                justifyContent="space-between"
              >
                <Typography gutterBottom variant="h6" component="h2">
                  {props.coupon.price}{" "}
                </Typography>
                <AttachMoneyIcon
                  sx={{
                    width: "2rem",
                    marginRight: 0.5,
                    marginTop: 0.5,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Box height="50%">
            <Typography>{props.coupon.description}</Typography>
          </Box>
          <Grid container spacing={2}>
            {/* <Box height="15vh"> */}
            {/* <Box display="sticky" flexDirection="row" alignContent="center"> */}
            <Grid item xs={2}>
              <EventBusyIcon
                sx={{
                  width: "2rem",
                  marginRight: 0.5,
                  marginTop: 0.5,
                }}
              />{" "}
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h6" component="p">
                {props.coupon.endDate}
              </Typography>
            </Grid>
            {/* </Box> */}
            {/* </Box> */}
          </Grid>
        </CardContent>
        {renderSwitch()}
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DeletePrompt
          handleClose={handleClose}
          deleteableID={props.coupon.id as number}
          targetType={DeleteableEntity.COUPON}
          deleteFunc={() => {
            deleteCoupon(props.coupon);
          }}
          children={undefined}
        />
      </Dialog>
    </React.Fragment>
  );
}

export default Coupon;
//
