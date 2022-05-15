import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { CustomerModel } from "../../../Modals/CustomerModel";
import CustomerTable from "../CustomerTable/CustomerTable";
import "./GetAllCustomers.css";

function GetAllCustomers(): JSX.Element {
  const [customers, setCustomers] = useState<CustomerModel[]>([]);
  const [isLoad, setLoad] = useState<boolean>(false);
  const [isError, setError] = useState(false);
  const [myError, setMyError] = useState("");
  const [collapse, setCollapse] = useState(false);
  const token = localStorage.getItem("token") as string;

  useEffect(() => {
    const url = "http://localhost:8080/admin/getAllCustomers";
    axios
      .get(url, { headers: { Authorization: token } })
      .then((response) => {
        console.log(response);
        setCustomers(response.data);
        console.log(customers);
        if (response.data) {
          setLoad(true);
        }
      })
      .catch((error: AxiosError) => {
        const err = error.response?.request.responseText;
        const errMessage = JSON.stringify(err);
        console.log(errMessage);

        setMyError(errMessage.slice(22, 66));

        setError(true);
      });
  }, [isLoad, token]);

  useEffect(() => {
    console.log(isError);
  }, [isError]);

  useEffect(() => {}, [collapse]);

  //   const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  //     color: theme.palette.getContrastText(grey[800]),
  //     backgroundColor: grey[800],
  //     "&:hover": {
  //       backgroundColor: grey[600],
  //     },
  //   }));
  return (
    <div className="GetAllCustomers">
      <CustomerTable customers={customers} />
    </div>
  );
}

export default GetAllCustomers;
