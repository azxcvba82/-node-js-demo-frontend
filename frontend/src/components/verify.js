import React, { useState, useEffect } from "react";
import LoginService from "../services/login.service";
import PageGuardService from "../services/pageguard.service";



// displays a page header

export default function Verify() {
  const [noticeMes, setNoticeMes] = useState("");
  const [errorMes, setErrorMes] = useState("");
  const [isError, setIsError] = useState(false);

  const verifyToken = (token) => {
    LoginService.verifyToken(token)
      .then((response) => {
        setIsError(false);
        setErrorMes("");
        PageGuardService.createCookie(response.data.email,response.data.token,response.data.expiresAt);
        setNoticeMes("Validate success. After 2 seconds redirect to dashboard!");
        setTimeout(() => {
          window.open('/dashboard', '_blank', 'location=0');
        }, 2000);
      })
      .catch((error) => {
        setIsError(true);
        setErrorMes(error?.response?.data);
        console.log(error);
      });
  };

  const checkParameters = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');
    verifyToken(token);

    // clear parameters
    //window.history.pushState("", document.title, window.location.pathname + window.location.search);
  };

  useEffect(() => {
    checkParameters();
  }, []);
  return (
    <div >
      <h3>Verify result: {noticeMes}{errorMes}
      </h3>
    </div>
  );
}