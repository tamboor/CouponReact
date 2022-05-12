import axios from "axios";
import { useEffect } from "react";
import "./CartCoupon.css";

interface cartItemProps{
    id: number;
}

function CartCoupon(props:cartItemProps): JSX.Element {

    useEffect(()=>{
        axios.get().then((res)=>{}).catch(()=>{})
    },[])



    return (
        <div className="CartCoupon">
			
        </div>
    );
}

export default CartCoupon;
