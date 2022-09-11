import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PageGuardService from "../services/pageguard.service";
import UserService from "../services/user.service";


// displays a page header

export default function Userprofile() {
  const history = useHistory();
  const [errorMes, setErrorMes] = useState("");
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");

  const isLogin = PageGuardService.isExistValidLogin();
  if(isLogin === false){
    history.push('/', {replace: true}, [history]);
  }

  const getUserProfile = () => {
    UserService.getUserProfile()
     .then((response) => {
       setIsError(false);
       setErrorMes("");
       setEmail(response.data.email);
       setName(response.data.name);
     })
     .catch((error) => {
       setIsError(true);
       setErrorMes(error.response.data.message)
     });
  };

  const changeName = (name) => {
    UserService.changeName(name)
     .then((response) => {
       setIsError(false);
       setErrorMes("");
       getUserProfile();
     })
     .catch((error) => {
       setIsError(true);
       setErrorMes(error.response.data.message)
     });
  };

  const handleChangeName = () => {
    setNewName("");
    changeName(newName);
  }

  const handleLogout = () => {
    PageGuardService.clearCookie();
    history.push('/', {replace: true}, [history]);
  }

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div  class="container" >
      <div className="h2">E-mail: {email}</div>
      <div className="h2">Name: {name}</div>
      <div>
        <div ><input type="text" name="fName" placeholder="name" value={newName} onChange={(e) => setNewName(e.target.value)}/><span>  </span><button className="loingBtn" type="submit"onClick={handleChangeName}>Replace</button></div>
        <div ><button className="loingBtn" type="submit"onClick={handleLogout}>Logout</button></div>
        <div className="error">{errorMes}</div>
      </div>
    </div>
  );
}