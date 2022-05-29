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
  Pagination,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { CouponModel } from "../../../../Models/CouponModel";
import AddCoupon from "../../../cards/AddCoupon/AddCoupon";
import Coupon from "../../../cards/Coupon/Coupon";
import "./CouponBrowser.css";

interface ICouponListFilterState {
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
  // showPurchaseable: boolean;
}

interface ICouponListSortState {
  couponsSorted: CouponModel[];
  compareMethod: (a: CouponModel, b: CouponModel) => number;
  limit: number;
  order: -1 | 1;
  page: number;
}

interface ICouponListProps {
  allCoupons: CouponModel[];
  customerCoupons?: CouponModel[];
}
//TODO: add an option to filter out customercoupons
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
  const [filterState, setFilterState] = useState<ICouponListFilterState>({
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
  const [sortState, setSortState] = useState<ICouponListSortState>({
    compareMethod: compareCouponsByEndDate,
    couponsSorted: filterState.couponsFiltered,
    limit: 8,
    order: 1,
    page: 1,
  });

  const filters = [
    (c: CouponModel) => {
      return filterState.categories[
        c.category as keyof typeof filterState.categories
      ];
    },
    (c: CouponModel) => {
      return (
        filterState.valueRange[0] <= c.price &&
        c.price <= filterState.valueRange[1]
      );
    },
    (c: CouponModel) => {
      return (
        c.description.includes(filterState.searchbar) ||
        c.title.includes(filterState.searchbar)
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
    setFilterState({
      ...filterState,
      categories: {
        ...filterState.categories,
        [event.target.name as keyof typeof filterState.categories]:
          event.target.checked,
      },
    });
  };
  const handleChangeSlider = (event: Event, newValue: number | number[]) => {
    setFilterState({ ...filterState, valueRange: newValue as number[] });
  };
  //TODO: combine all handleChange
  //TODO: handle event anywhere

  //todo: fix checkbox's default check
  const handleChangeSearchbar = (event: any) => {
    setFilterState({ ...filterState, searchbar: event.target.value });
  };
  function valuetext(value: number) {
    return `${value}`;
  }

  function getFilteredCoupons() {
    return props.allCoupons.filter((c: CouponModel) => {
      return filters.every((f) => f(c) === true);
    });
  }

  function compareCouponsByPrice(a: CouponModel, b: CouponModel) {
    return (a.price - b.price) * sortState.order;
  }

  function compareCouponsByEndDate(a: CouponModel, b: CouponModel) {
    return (
      (new Date(a.endDate).getTime() - new Date(b.endDate).getTime()) *
      sortState.order
    );
  }

  function getSortedCoupons() {
    const filtered = getFilteredCoupons();
    const startIndex = (sortState.page - 1) * sortState.limit;
    // console.log(
    //   filtered
    //     .sort(sortState.compareMethod)
    //     .slice(startIndex, startIndex + sortState.limit)
    // );

    return filtered
      .sort(sortState.compareMethod)
      .slice(startIndex, startIndex + sortState.limit);
  }

  const customerCoupons = props.customerCoupons
    ? props.customerCoupons.map((c) => c.id)
    : [];
  const cartCoupons = state.users.cart.map((c) => c.id);

  // const showCoupons = getSortedCoupons()

  return (
    <div className="CouponBrowser">
      <Box paddingY={3}>
        <Container>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 4 }}>
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
                      value={filterState.valueRange}
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
            <Box sx={{ alignContent: "flex-end", flexGrow: 1 }}>
              <Select
                value={sortState.limit}
                label="Limit"
                onChange={(e) => {
                  setSortState({ ...sortState, limit: Number(e.target.value) });
                }}
              >
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={32}>32</MenuItem>
              </Select>
            </Box>
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
            {state.users.userRole === "customer"
              ? getSortedCoupons()
                  .map((coupon: CouponModel, index: number) => (
                    <Coupon
                      coupon={coupon}
                      isPurchased={
                        customerCoupons.includes(coupon.id) ||
                        cartCoupons.includes(coupon.id)
                      }
                      key={index}
                    />
                  ))
                  .sort()
              : getSortedCoupons().map((coupon: CouponModel) => (
                  <Coupon coupon={coupon} isPurchased={false} key={coupon.id} />
                ))}
          </Grid>
          <Pagination
            count={Math.ceil(props.allCoupons.length / sortState.limit)}
            onChange={(event, value) => {
              setSortState({ ...sortState, page: value });
            }}
          />
        </Container>
      </Box>
    </div>
  );
}
//TODO: add chose sort method
export default CouponBrowser;
