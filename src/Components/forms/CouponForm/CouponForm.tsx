import axios, { AxiosResponse, AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import getAuthHeaders, { setStoredToken } from "../../../utils/tokenUtils";
import { AdminVerbs } from "../../user-specific/admin/AdminVerbs";
import "./CouponForm.css";
interface CouponFormProps {
  verb: AdminVerbs;
  coupon: CouponForm;
  handleClose: Function;
  updateFunction?: Function;
  addFunction?: Function;
}

interface CouponForm {
  id: number;
  category: string;
  description: string;
  startDate: string;
  endDate: string;
  image: string;
  price: number;
  title: string;
}

function CouponForm(props: CouponFormProps): JSX.Element {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<CouponForm>();

  const onSubmit: SubmitHandler<CouponForm> = async (data) => {
    switch (props.verb) {
      case AdminVerbs.ADD:
        axios
          .post(
            `http://localhost:8080/company/addCoupon`,
            { ...data, id: 0 },
            getAuthHeaders()
          )
          .then((res: AxiosResponse) => {
            setStoredToken(res);
            props.addFunction?.({ ...data });
          })
          .catch((error: AxiosError) => {
            console.log(error);
          });
        break;
      case AdminVerbs.UPDATE:
        axios
          .put(
            `http://localhost:8080/company/updateCoupon`,
            { ...props.coupon, ...data },
            getAuthHeaders()
          )
          .then((res: AxiosResponse) => {
            setStoredToken(res);
            props.updateFunction && props.updateFunction(data);
          })
          .catch((error: AxiosError) => {
            console.log(error);
          });
        break;
    }
  };

  return <div className="CouponForm">this is coupon form</div>;
}

export default CouponForm;
