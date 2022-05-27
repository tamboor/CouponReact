import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { setFetchMethodCompanies } from "../../../../utils/fetchAdminUsers";
import globals, { host } from "../../../../utils/globals";
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

  function fetchCompanies() {
    axios
      .get(`${host}/admin/getAllCompanies`, getAuthHeaders())
      .then((response) => {
        setStoredToken(response);
        setCompanies(response.data);
      })
      .catch((error: any) => {
        notify.error(error.response.data.description);
        console.log(error);
      });
  }

  useEffect(() => {
    fetchCompanies();
  }, [users.userRole]);

  setFetchMethodCompanies(() => {
    fetchCompanies();
  });

  return <CompanyTable companies={admin.companies} />;
}

export default GetAllCompanies;
