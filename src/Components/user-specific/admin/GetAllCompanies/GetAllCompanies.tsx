import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import notify from "../../../../utils/Notify";
import getAuthHeaders, { setStoredToken } from "../../../../utils/tokenUtils";
// import { CompanyModel } from "../../../Models/CompanyModel";
import CompanyTable from "../CompanyTable/CompanyTable";
import "./GetAllCompanies.css";
//TODO: change to admin homepage architecture
//TODO: add pagination
function GetAllCompanies(): JSX.Element {
  const { setCompanies } = useActions();
  const { admin, users } = useTypedSelector((state) => state);

  useEffect(() => {
    const url = "http://localhost:8080/admin/getAllCompanies";
    axios
      .get(url, getAuthHeaders())
      .then((response) => {
        setStoredToken(response);
        setCompanies(response.data);
      })
      .catch((error: any) => {
        notify.error(error.response.data.description);
        console.log(error);
      });
  }, [users.userRole]);

  return <CompanyTable companies={admin.companies} />;
}

export default GetAllCompanies;
