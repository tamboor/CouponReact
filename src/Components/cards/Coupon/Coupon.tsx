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
import CouponMenu from "../../views/header-content/CouponMenu/CouponMenu";
import { useState } from "react";
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

// interface couponProps {
//   amount: number;
//   category: string;
//   description: string;
//   endDate: number;
//   id: number;
//   image: string;
//   price: number;
//   startDate: number;
//   title: string;
// }
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

  // console.log("type from coupon: " + typeof state.users.cart);
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
  //  (event: any) => {
  //   return (
  //     <CouponForm
  //       verb={AdminVerbs.UPDATE}
  //       coupon={props.coupon}
  //       handleClose={() => {}}
  //     />
  //   );
  // };
  const handleCancel = () => {
    setShowForm(false);
  };

  // console.log(state.users.cart.includes(props.coupon));

  function renderSwitch() {
    switch (state.users.userRole) {
      case "customer":
        return (
          <Button onClick={handleAddToCart} disabled={props.isPurchased}>
            Add to cart
          </Button>
        );
      case "company":
        return (
          <Box>
            <Button onClick={handleEditCoupon}>
              <EditIcon />
            </Button>
            {/* <ActionUserForm verb={AdminVerbs.DELETE} formType="coupon" /> */}
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
    //TODO: move gridItem to showCoupons

    // <Grid item xs={3}>
    //   <Paper elevation={12} sx={props?.styles}>
    //     <Box paddingX={2} paddingY={1}>
    //       <img src={props.coupon.image} alt="" className="img" />
    //       <Grid item xs={3}>
    //         <Typography variant="h6" component="h6">
    //           {props.coupon.category}
    //         </Typography>
    //       </Grid>
    //       {/* <Grid item xs={3}> */}
    //       <Typography variant="h4" component="h2">
    //         {props.coupon.title}
    //       </Typography>
    //       {/* </Grid> */}
    //       <Typography variant="h4" component="h2">
    //         {props.coupon.price}
    //         <AttachMoneyIcon
    //           sx={{
    //             width: "2rem",
    //             marginRight: 0.5,
    //           }}
    //         />
    //       </Typography>
    //       <Typography variant="h6" component="h2">
    //         {props.coupon.description}
    //       </Typography>
    //       {/* <Box> */}
    //       <Typography variant="h6" component="p">
    //         <EventAvailableIcon
    //           sx={{
    //             width: "2rem",
    //             marginRight: 0.5,
    //           }}
    //         />
    //         {props.coupon.startDate}
    //       </Typography>
    //       <Typography variant="h6" component="p">
    //         <EventBusyIcon
    //           sx={{
    //             width: "2rem",
    //             marginRight: 0.5,
    //           }}
    //         />
    //         {props.coupon.endDate}
    //       </Typography>
    //       {/* </Box> */}
    //       <Typography variant="h6" component="p">
    //         <Inventory2OutlinedIcon
    //           sx={{
    //             width: "2rem",
    //             marginRight: 0.5,
    //           }}
    //         />
    //         {props.coupon.amount}
    //       </Typography>
    //       {renderSwitch()}
    //     </Box>
    //   </Paper>
    //   <Dialog open={open} onClose={handleClose}>
    //     <DeletePrompt
    //       handleClose={handleClose}
    //       deleteableID={props.coupon.id as number}
    //       targetType={DeleteableEntity.COUPON}
    //       deleteFunc={() => {
    //         deleteCoupon(props.coupon);
    //       }}
    //     >
    //       {/* {props.formType} */}
    //     </DeletePrompt>
    //   </Dialog>
    // </Grid>

    <Grid item key={props.coupon.id} xs={12} sm={12} md={4} xl={2.4} lg={3}>
      <Card sx={{ height: "70vh", display: "flow", flexDirection: "column" }}>
        <CardMedia
          component="img"
          sx={{
            // 16:9
            height: "40%",
            paddingTop: "0%",
            paddingBottom: "12%",
          }}
          image={props.coupon.image}
          alt="coupon img"
        />
        {/* <CardContent sx={{ flexGrow: 20, height: 115 }}> */}

        <CardContent sx={{ height: "50%" }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Box
                display="flex"
                flexDirection="row"
                alignContent="center"
                justifyContent="flex-start"
                height="15vh"
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

          {/* <Typography gutterBottom variant="h5" component="h2">
            {props.coupon.title}
          </Typography> */}
          <Box height="20vh">
            <Box height="10vh">
              <Typography>{props.coupon.description}</Typography>
            </Box>
            {/* <Box display="flex" flexDirection="row" alignContent="center">
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
            </Box> */}
            <Box display="flex" flexDirection="row" alignContent="center">
              <EventBusyIcon
                sx={{
                  width: "2rem",
                  marginRight: 0.5,
                  marginTop: 0.5,
                }}
              />
              <Typography variant="h6" component="p">
                {props.coupon.endDate}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <CardActions sx={{ position: "relative" }}>
          {renderSwitch()}
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DeletePrompt
          handleClose={handleClose}
          deleteableID={props.coupon.id as number}
          targetType={DeleteableEntity.COUPON}
          deleteFunc={() => {
            deleteCoupon(props.coupon);
          }}
        >
          {/* {props.formType} */}
        </DeletePrompt>
      </Dialog>
    </Grid>
  );
}

export default Coupon;
//
