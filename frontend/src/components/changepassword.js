import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import UserService from "../services/user.service";
import PageGuardService from "../services/pageguard.service";

// displays a page header

export default function Changepassword() {
  const history = useHistory();

  const [isError, setIsError] = useState(false);
  const [errorMes, setErrorMes] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const isLogin = PageGuardService.isExistValidLogin();
  if(isLogin === false){
    history.push('/', {replace: true}, [history]);
  }

  const postChangeData = () => {
    UserService.resetPassword(oldPassword,password)
      .then((response) => {
        setPassword("")
        setIsError(false);
        setErrorMes("")
        PageGuardService.createCookie(response.data.email,response.data.token,response.data.expiresAt);
        history.push('/dashboard', {replace: true}, [history]);
      })
      .catch((error) => {
        setPassword("")
        setIsError(true);
        setErrorMes(error?.response?.data.message)
        console.log(error)
      });
  };

  const handleChangeSubmit = (e) => {
    if (password !== rePassword){
      setIsError(true);
      setErrorMes("confirm password and password not match!");
      return; 
    } else if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/)){
      setIsError(true);
      setErrorMes("password should contain: 1. one upper char 2. one lower char 3. one number 4. special (@#$!%*?&) char 5. at least 8 characters");
      return;
    }
    setIsError(false);
    setErrorMes("");
    postChangeData();
  };

  return (
    <div >
      <div className="box">
        <div className="h2">Change Password</div>
          <div className="form-input-password">
            <input type="password" name="fOldPassword" placeholder="old password" className="form-control" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
          </div>
          <div className="form-input-password">
            <input type="password" name="fPassword" placeholder="new password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="form-input-password">
            <input type="password" name="fConfirmPassword" placeholder="confirm password" className="form-control" value={rePassword} onChange={(e) => setRePassword(e.target.value)}/>
          </div>
          <div className="error">{errorMes}</div>
          <div className="loingBtn" type="submit"onClick={handleChangeSubmit}>Change</div>
      </div>
    </div>
  );
}