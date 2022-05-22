import {
  Box,
  Container,
  Button,
  Menu,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  TextField,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { CouponModel } from "../../../../Models/CouponModel";
import AddCoupon from "../../../cards/AddCoupon/AddCoupon";
import Coupon from "../../../cards/Coupon/Coupon";
import "./CouponBrowser.css";

interface ICouponListState {
  couponsFiltered: CouponModel[];
  categories: {
    xtreme: boolean;
    tattoos: boolean;
    food: boolean;
    vacation: boolean;
    cars: boolean;
  };
  valueRange: number[];
  searchbar: string;
}

interface ICouponListProps {
  allCoupons: CouponModel[];
  customerCoupons?: CouponModel[];
}

function CouponBrowser(props: ICouponListProps): JSX.Element {
  //   console.log(props.allCoupons);
  const state = useTypedSelector((state) => state);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const getMinMaxPrice = () => {
    const mapped = props.allCoupons.map((coupon) => coupon.price);
    if (mapped.length === 0) return [0, 500];
    // console.log(mapped);
    return [Math.min(...mapped), Math.max(...mapped)];
  };
  const [minPrice, maxPrice] = getMinMaxPrice();
  const [listState, setListState] = useState<ICouponListState>({
    couponsFiltered: props.allCoupons,
    categories: {
      xtreme: true,
      tattoos: true,
      food: true,
      vacation: true,
      cars: true,
    },
    valueRange: [minPrice, maxPrice],
    searchbar: "",
  });

  const filters = [
    (c: CouponModel) => {
      return listState.categories[
        c.category as keyof typeof listState.categories
      ];
    },
    (c: CouponModel) => {
      return (
        listState.valueRange[0] <= c.price && c.price <= listState.valueRange[1]
      );
    },
    (c: CouponModel) => {
      return (
        c.description.includes(listState.searchbar) ||
        c.title.includes(listState.searchbar)
      );
    },
  ];

  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListState({
      ...listState,
      categories: {
        ...listState.categories,
        [event.target.name as keyof typeof listState.categories]:
          event.target.checked,
      },
    });
  };

  //   console.log("im here");

  const handleChangeSlider = (event: Event, newValue: number | number[]) => {
    setListState({ ...listState, valueRange: newValue as number[] });
  };
  //TODO: combine all handleChange
  //TODO: handle event anywhere
  const handleChangeSearchbar = (event: any) => {
    setListState({ ...listState, searchbar: event.target.value });
  };
  function valuetext(value: number) {
    return `${value}`;
  }

  function getFilteredCoupons() {
    return props.allCoupons.filter((c: CouponModel) => {
      return filters.every((f) => f(c) === true);
    });
  }

  const customerCoupons = props.customerCoupons
    ? props.customerCoupons.map((c) => c.id)
    : [];
  const cartCoupons = state.users.cart.map((c) => c.id);
  console.log(customerCoupons);
  return (
    <div className="CouponBrowser">
      <Box paddingY={3}>
        <Container>
          <Box sx={{ flexGrow: 1 }}>
            <Button
              onClick={handleClick}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              disableElevation
            >
              Refine
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                <FormLabel>Categories</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="xtreme"
                        defaultChecked={true}
                        onChange={handleCheckbox}
                      />
                    }
                    label="Xtreme"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="tattoos"
                        defaultChecked={true}
                        onChange={handleCheckbox}
                      />
                    }
                    label="Tatoos"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="food"
                        defaultChecked={true}
                        onChange={handleCheckbox}
                      />
                    }
                    label="Food"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="vacation"
                        defaultChecked={true}
                        onChange={handleCheckbox}
                      />
                    }
                    label="Vacations"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="cars"
                        defaultChecked={true}
                        onChange={handleCheckbox}
                      />
                    }
                    label="Cars"
                  />
                </FormGroup>
                <br />
                <FormLabel>Price Range</FormLabel>
                <Box sx={{ width: 300 }}>
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={listState.valueRange}
                    onChange={handleChangeSlider}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={minPrice}
                    max={maxPrice}
                  />
                </Box>
              </FormControl>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              onChange={handleChangeSearchbar}
            />
          </Box>
          <Grid container spacing={5} marginTop={0.005}>
            {state.users.userRole === "company" && (
              <Grid item xs={3}>
                <AddCoupon />
              </Grid>
            )}
            //TODO: fixed is isPurchased
            {state.users.userRole === "customer"
              ? getFilteredCoupons().map((coupon: CouponModel) => (
                  <Coupon
                    coupon={coupon}
                    isPurchased={
                      customerCoupons.includes(coupon.id) ||
                      cartCoupons.includes(coupon.id)
                      // state.users.cart.includes(coupon.id)
                    }
                    key={coupon.id}
                  />
                ))
              : getFilteredCoupons().map((coupon: CouponModel) => (
                  <Coupon coupon={coupon} isPurchased={false} key={coupon.id} />
                ))}
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default CouponBrowser;
