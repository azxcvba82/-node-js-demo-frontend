import React, { useState } from "react";
import LoginService from "../services/login.service";

// displays a page header

export default function Signup() {
  const [isError, setIsError] = useState(false);
  const [noticeMes, setNoticeMes] = useState("");
  const [errorMes, setErrorMes] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const postSignupData = () => {
    LoginService.signup(email,password)
      .then((response) => {
        setPassword("")
        setIsError(false);
        setErrorMes("")
        setNoticeMes("we have mailed a confirm mail to your mail box. please check your mail box and click link in that mail to finish signup!");
      })
      .catch((error) => {
        setPassword("")
        setIsError(true);
        setErrorMes(error?.response?.data.message);
        console.log(error);
      });
  };

  const handleSignupSubmit = (e) => {
    if (password !== rePassword){
      setIsError(true);
      setErrorMes("confirm password and password not match!");
      return; 
    } else if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/)){
      setIsError(true);
      setErrorMes("e-mail address not valid!");
      return;
    } else if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/)){
      setIsError(true);
      setErrorMes("password should contain: 1. one upper char 2. one lower char 3. one number 4. special (@#$!%*?&) char 5. at least 8 characters");
      return;
    }
    setIsError(false);
    setErrorMes("");
    postSignupData();
  };


  return (
    <div >
        <form  method="post" id="LoginForm">
                <div  className="box" id="register">
                    <div className="h2">Signup Panel</div>
                    <div className="col-xs-12">
                        <input type="text" name="fEmail" placeholder="E-mail" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-input-password">
                        <input type="password" name="fPassword" placeholder="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="form-input-password">
                        <input type="password" name="fConfirmPassword" placeholder="confirm password" className="form-control" value={rePassword} onChange={(e) => setRePassword(e.target.value)}/>
                    </div>
                    <div className="error">{noticeMes}{errorMes}</div>
                    <div className="loingBtn" type="submit"onClick={handleSignupSubmit}>Signup</div>
                </div>
        </form>
    </div>
  );
}