import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import notify from "../../../../utils/Notify";
import getAuthHeaders, { setStoredToken } from "../../../../utils/tokenUtils";
import CustomerTable from "../CustomerTable/CustomerTable";
import "./GetAllCustomers.css";

//todo: what is setLoad
//TODO: check why this only works after 2 refreshes
function GetAllCustomers(): JSX.Element {
  const { setCustomers } = useActions();
  const { admin, users } = useTypedSelector((state) => state);

  const fetchCustomers = () => {
    const url = "http://localhost:8080/admin/getAllCustomers";
    axios
      .get(url, getAuthHeaders())
      .then((response) => {
        setStoredToken(response);
        setCustomers(response.data);
      })
      .catch((error: any) => {
        notify.error(error.response.data.description);
        console.log(error);
      });
  };

  //TODO: ask alon how this works
  useEffect(() => {
    fetchCustomers();
  }, [users.userRole]);

  return (
    <div className="GetAllCustomers">
      <CustomerTable customers={admin.customers} />
    </div>
  );
}

export default GetAllCustomers;
