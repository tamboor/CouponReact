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
import axios, { AxiosResponse } from "axios";
import { Component, useEffect } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { CouponModel } from "../../../Modals/CouponModel";
import Coupon from "../../cards/Coupon/Coupon";
import getAuthHeaders from "../../utils/tokenUtils";
import "./CouponList.css";

interface IShowCouponProps {}

interface CouponsState {
  coupons: CouponModel[];
  couponsFiltered: CouponModel[];
  categories: {
    xtreme: boolean;
    tattoos: boolean;
    food: boolean;
    vacation: boolean;
    cars: boolean;
  };
  valueRange: number[];
  anchorEl: null | HTMLElement;
}

class CouponList extends Component<IShowCouponProps, CouponsState> {
  constructor(props: IShowCouponProps) {
    super(props);
    this.state = {
      coupons: [],
      couponsFiltered: [],
      categories: {
        xtreme: true,
        tattoos: true,
        food: true,
        vacation: true,
        cars: true,
      },
      valueRange: [0, 500],
      anchorEl: null,
    };
  }

  public render(): JSX.Element {
    const reduxState = useTypedSelector((reduxState) => reduxState);

    const open = Boolean(this.state.anchorEl);

    const priceFilter = (allCoupons: CouponModel[]) => {
      return allCoupons.filter(
        (c: CouponModel) =>
          c.price >= this.state.valueRange[0] &&
          c.price <= this.state.valueRange[1]
      );
    };
    const categoryFilter = (allCoupons: CouponModel[]) => {
      return allCoupons.filter((c: CouponModel) => {
        return this.state.categories[
          c.category as keyof typeof this.state.categories
        ];
      });
    };

    const allFilters = [priceFilter, categoryFilter];

    const handleChange = (event: Event, newValue: number | number[]) => {
      let workCoupons = this.state.coupons;

      allFilters.forEach((filt) => {
        workCoupons = filt(workCoupons);
      });
      this.setState({
        ...this.state,
        couponsFiltered: workCoupons,
        valueRange: newValue as number[],
      });
    };

    // console.log(state);

    //TODO: combine all handleChange
    const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
      let workCoupons = this.state.coupons;

      this.state.categories[
        event.target.name as keyof typeof this.state.categories
      ] = event.target.checked;

      allFilters.forEach((filt) => {
        workCoupons = filt(workCoupons);
      });
      this.setState({ couponsFiltered: workCoupons });
    };

    function valuetext(value: number) {
      return `${value}°C`;
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      this.setState({ anchorEl: event.currentTarget });
    };
    const handleClose = () => {
      //   this.setState((state) => {
      //     anchorEl: null;
      //   });
      this.setState({ anchorEl: null });
    };

    const fetchCoupons = (): void => {
      console.log("fetching coupons");
      // const url = "http://localhost:8080/guest/getAllCoupons";
      // const url = () => {
      //   switch (state.users.userRole) {
      //     case "company":
      //       return "http://localhost:8080/company/getCompanyCoupons";
      //     default:
      //       return "http://localhost:8080/guest/getAllCoupons";
      //   }
      // };
      axios
        .get(
          reduxState.users.userRole === "company"
            ? "http://localhost:8080/company/getCompanyCoupons"
            : "http://localhost:8080/guest/getAllCoupons",
          getAuthHeaders()
        )
        .then((response) => {
          // console.log(response.data);
          // setShowState({
          //   ...showState,
          //   coupons: response.data,
          //   couponsFiltered: response.data,
          // });
          this.setState({
            coupons: response.data,
            couponsFiltered: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    useEffect(() => {
      fetchCoupons();
    }, []);

    //   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    //     this.setState(anchorEl: event.currentTarget);      };
    //   const handleClose = () => {
    //     this.setState(anchorEl: null);
    //   };

    // axios.get()
    let userCoupons: number[] = [];
    if (reduxState.users.userRole == "customer") {
      axios
        .get(
          "http://localhost:8080/customer/getCustomerCoupons",
          getAuthHeaders()
        )
        .then((res: AxiosResponse) => {
          userCoupons = res.data.map((c: CouponModel) => c.id);
          // localStorage.setItem("token", res.headers);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return (
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
            <Menu
              anchorEl={this.state.anchorEl}
              open={open}
              onClose={handleClose}
            >
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
                    value={this.state.valueRange}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    max={500}
                  />
                </Box>
              </FormControl>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <TextField id="outlined-basic" label="Search" variant="outlined" />
          </Box>
          <Grid container spacing={5} marginTop={0.005}>
            {/* {showState.couponsFiltered.map((c) => (
                    <Coupon coupon={c} isPurchased={} key={c.id} />
                  ))} */}
            {reduxState.users.userRole === "customer"
              ? this.state.couponsFiltered.map((c) => (
                  <Coupon
                    coupon={c}
                    isPurchased={userCoupons.includes(c.id)}
                    key={c.id}
                  />
                ))
              : this.state.couponsFiltered.map((c) => (
                  <Coupon coupon={c} isPurchased={false} key={c.id} />
                ))}
          </Grid>
        </Container>
      </Box>
    );
  }
}

export default CouponList;
