import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { CouponModel } from "../../../../Models/CouponModel";
import "./CouponTable.css";

interface CouponTableProps {
  coupons: CouponModel[];
}

function CouponTable(props: CouponTableProps): JSX.Element {
  return (
    <Box sx={{ margin: 1 }}>
      <Typography variant="h6" gutterBottom component="div">
        Coupons
      </Typography>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>amount</TableCell>
            <TableCell>start-date</TableCell>
            <TableCell>end-date</TableCell>
            <TableCell align="right">Total price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.coupons.map((coupon: CouponModel) => (
            <TableRow key={coupon.id}>
              <TableCell component="th" scope="row">
                {coupon.title}
              </TableCell>
              <TableCell>{coupon.description}</TableCell>
              <TableCell>{coupon.amount}</TableCell>
              <TableCell>{coupon.startDate}</TableCell>
              <TableCell>{coupon.endDate}</TableCell>
              <TableCell align="right">{coupon.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default CouponTable;
