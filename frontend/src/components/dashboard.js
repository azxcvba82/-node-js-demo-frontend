import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PageGuardService from "../services/pageguard.service";
import UserService from "../services/user.service";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';

// displays a page header

export default function Dashboard() {
  const history = useHistory();

  const [countSignup, setCountSignup] = useState(0);
  const [countActiveSession, setCountActiveSession] = useState(0);
  const [countActiveSession7Days, setCountActiveSession7Days] = useState(0);
  const [errorMes, setErrorMes] = useState("");
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useState([]);
  
  const isLogin = PageGuardService.isExistValidLogin();
  if(isLogin === false){
    history.push('/', {replace: true}, [history]);
  }

  const handleGotoUserProfile = e => {
    history.push('/userprofile', {replace: true}, [history]);
  };

  const handleGotoChangePassword = e => {
    history.push('/changepassword', {replace: true}, [history]);
  };

  const queryUsersStatus = () => {
    UserService.queryUsersStatus()
     .then((response) => {
       setIsError(false);
       setErrorMes("");
       setUsers(response.data);
     })
     .catch((error) => {
       setIsError(true);
       setErrorMes(error?.response?.data.message)
     });
  };

  const queryUsersHaveSignup = () => {
    UserService.queryUsersHaveSignup()
     .then((response) => {
       setIsError(false);
       setErrorMes("");
       setCountSignup(response?.data[0].result);
     })
     .catch((error) => {
       setErrorMes(error?.response?.data.message)
     });
  };

  const queryUsersHaveActiveSessionToday = () => {
    UserService.queryUsersHaveActiveSessionToday()
     .then((response) => {
       setIsError(false);
       setErrorMes("");
       setCountActiveSession(response?.data[0].result);
     })
     .catch((error) => {
       setErrorMes(error?.response?.data.message)
     });
  };

  const queryAverageActiveSessionInLast7Day = () => {
    UserService.queryAverageActiveSessionInLast7Day()
     .then((response) => {
       setIsError(false);
       setErrorMes("");
       setCountActiveSession7Days(response?.data[0].result);
     })
     .catch((error) => {
       setErrorMes(error?.response?.data.message)
     });
  };

  useEffect(() => {
    queryUsersStatus();
    queryUsersHaveSignup();
    queryUsersHaveActiveSessionToday();
    queryAverageActiveSessionInLast7Day();
  }, []);

  return (
    <div  class="container" >
      <h3>Dashboard</h3>
      <div >{errorMes}<br/></div>
        <div >
          <button className="dashboardBtn" type="button"onClick={handleGotoUserProfile}>User Profile</button>
        </div>
        <div >
          <button className="dashboardBtn" type="button"onClick={handleGotoChangePassword}>Change Password</button>
        </div>
      <div ><br/></div>
      <Card >
        Total number of users who have signed up: {countSignup}
      </Card>
      <Card >
        Total number of users with active sessions today: {countActiveSession}
      </Card>
      <Card >
        Average number of active session users in the last 7 days rolling: {countActiveSession7Days}
      </Card>
      <div ><br/></div>
      <div className="card">
                <DataTable value={users} responsiveLayout="scroll">
                    <Column field="fEmail" header="Email"></Column>
                    <Column field="fName" header="Name"></Column>
                    <Column field="fEmailVerify" header="Email Verify"></Column>
                    <Column field="fCreateTime" header="Create Time"></Column>
                    <Column field="fLastLoginTime" header="Last Login Time"></Column>
                    <Column field="fSessionTime" header="Session Time"></Column>
                    <Column field="fLoginCount" header="Login Count"></Column>
                </DataTable>
      </div>
    </div>
  );
}