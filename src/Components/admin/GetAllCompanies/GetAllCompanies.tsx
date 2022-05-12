import styled from "@emotion/styled";
import { Button, ButtonProps, Collapse } from "@mui/material";
import { grey } from "@mui/material/colors";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { CompanyModel } from "../../../Modals/CompanyModel";
import CompanyTable from "../../contents/CompanyTable/CompanyTable";
import "./GetAllCompanies.css";

function GetAllCompanies(): JSX.Element {
  const [companies, setCompanies] = useState<CompanyModel[]>([]);
  const [isLoad, setLoad] = useState<boolean>(false);
  const [isError, setError] = useState(false);
  const [myError, setMyError] = useState("");
  const [collapse, setCollapse] = useState(false);
  const token = localStorage.getItem("token") as string;

  useEffect(() => {
    const url = "http://localhost:8080/admin/getAllCompanies";
    axios
      .get(url, { headers: { Authorization: token } })
      .then((response) => {
        console.log(response);
        setCompanies(response.data);
        console.log(companies);
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
    <div id="CompanyTable">
      {/* <Collapse in={collapse}> */}
      <CompanyTable companies={companies} />
      {/* </Collapse>{" "} */}
    </div>
  );
}

export default GetAllCompanies;
