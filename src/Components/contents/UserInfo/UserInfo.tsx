import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import "./UserInfo.css";
import axios from "axios";


//TODO: move axios to an import
function UserInfo(): JSX.Element {
    
    const state = useTypedSelector((state) => state);
    const navigate = useNavigate();


    useEffect(() => {
        let url = "";
        switch(state.users.userRole){
            case 'customer':
                url = "http://localhost:8080/customer/getCustomerDetails";
                break;
            case 'company':
                url = "http://localhost:8080/company/getCompanyDetails";
                break;
            default:
                navigate("/404")
                break;
        }
        // const value = localStorage.getItem("token")
        const token = localStorage.getItem("token") as string
        
        axios.get(url, {headers:{'Authorization': token}}).then((response:any) => {
          
        });
      }, []);

    if(state.users.userRole !== 'admin'){
        const url = ``
    }
    
  return (

  );
}

export default UserInfo;
function useEffect(arg0: () => void, arg1: never[]) {
    throw new Error("Function not implemented.");
}

function setCoupons(data: any) {
    throw new Error("Function not implemented.");
}

