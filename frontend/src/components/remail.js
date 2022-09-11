import React, { useState } from "react";
import UserService from "../services/user.service";
import PageGuardService from "../services/pageguard.service";
import { useHistory } from "react-router-dom";

// displays a page header

export default function Remail() {
  const history = useHistory();

  const [errorMes, setErrorMes] = useState("");
  const [isError, setIsError] = useState(false);
  const [noticeMes, setNoticeMes] = useState("");

  const isLogin = PageGuardService.isExistValidLogin();
  if(isLogin === false){
    history.push('/', {replace: true}, [history]);
  }

  const postRequestData = () => {
    UserService.reSendMail()
      .then((response) => {
        setIsError(false);
        setErrorMes("");
        setNoticeMes("we have mailed a confirm mail to your mail box. please check your mail box and click link in that mail to finish signup!");
      })
      .catch((error) => {
        setIsError(true);
        setErrorMes(error?.response?.data.message)
      });
  };

  const handleResendSubmit = e => {
    postRequestData();
  };
  
  return (
    <div >
        <form  method="post" id="LoginForm">
                <div  className="box" id="register">
                    <div className="h2">Re-Send Mail</div>
                    <div className="error">{noticeMes}{errorMes}</div>
                    <div className="loingBtn" type="submit"onClick={handleResendSubmit}>Re-Send</div>
                </div>
        </form>
    </div>
  );
}