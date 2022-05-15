import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Menu,
  Slider,
} from "@mui/material";
import "./CouponsFilter.css";

interface IFilterProps {
  checkboxHandler: Function;
  changeHandler: Function;
}

//TODO: decouple components
function CouponsFilter(props: IFilterProps): JSX.Element {
  const { checkboxHandler, changeHandler } = props;

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    checkboxHandler(event);
  };
  const handleChange = (event: Event, newValue: number | number[]) => {
    changeHandler(event, newValue);
  };

  return <div></div>;
  // <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
  //         <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
  //           <FormLabel>Categories</FormLabel>
  //           <FormGroup>
  //             <FormControlLabel
  //               control={
  //                 <Checkbox
  //                   name="xtreme"
  //                   defaultChecked={true}
  //                   onChange={handleCheckbox}
  //                 />
  //               }
  //               label="Xtreme"
  //             />
  //             <FormControlLabel
  //               control={
  //                 <Checkbox
  //                   name="tattoos"
  //                   defaultChecked={true}
  //                   onChange={handleCheckbox}
  //                 />
  //               }
  //               label="Tatoos"
  //             />
  //             <FormControlLabel
  //               control={
  //                 <Checkbox
  //                   name="food"
  //                   defaultChecked={true}
  //                   onChange={handleCheckbox}
  //                 />
  //               }
  //               label="Food"
  //             />
  //             <FormControlLabel
  //               control={
  //                 <Checkbox
  //                   name="vacation"
  //                   defaultChecked={true}
  //                   onChange={handleCheckbox}
  //                 />
  //               }
  //               label="Vacations"
  //             />
  //             <FormControlLabel
  //               control={
  //                 <Checkbox
  //                   name="cars"
  //                   defaultChecked={true}
  //                   onChange={handleCheckbox}
  //                 />
  //               }
  //               label="Cars"
  //             />
  //           </FormGroup>
  //           <br />
  //           <FormLabel>Price Range</FormLabel>
  //           <Box sx={{ width: 300 }}>
  //             <Slider
  //               getAriaLabel={() => "Temperature range"}
  //               value={showState.valueRange}
  //               onChange={handleChange}
  //               valueLabelDisplay="auto"
  //               getAriaValueText={valuetext}
  //               max={500}
  //             />
  //           </Box>
  //         </FormControl>
  //       </Menu>
  // );
}

export default CouponsFilter;
