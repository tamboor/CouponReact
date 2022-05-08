// import styled from "@emotion/styled";
// import {
//   MenuProps,
//   Menu,
//   alpha,
//   Button,
//   Divider,
//   MenuItem,
// } from "@mui/material";
// import React from "react";
// import "./CouponMenu.css";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Skateboarding } from "@mui/icons-material";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useNavigate } from "react-router-dom";
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
function CouponMenu(): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Find Coupons
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            navigate("/show-coupons/getCouponsByCategory/xtreme");
            handleClose();
          }}
          disableRipple
        >
          <Skateboarding />
          Xtreme
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/show-coupons/getCouponsByCategory/tattoos");
            handleClose();
          }}
          disableRipple
        >
          <AutoAwesomeIcon />
          Tattoos
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/show-coupons/getCouponsByCategory/food");
            handleClose();
          }}
          disableRipple
        >
          <FastfoodIcon />
          Food
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/show-coupons/getCouponsByCategory/vacation");
            handleClose();
          }}
          disableRipple
        >
          <BeachAccessIcon />
          Vacations
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/show-coupons/getCouponsByCategory/cars");
            handleClose();
          }}
          disableRipple
        >
          <DirectionsCarIcon />
          Cars
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <MonetizationOnIcon />
          Find By Price
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
export default CouponMenu;
