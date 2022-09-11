import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import LoginService from "../services/login.service";
import PageGuardService from "../services/pageguard.service";

// displays a page header

export default function Login() {
  const [errorMes, setErrorMes] = useState("");
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const checkLogin = () => {
    const isLogin = PageGuardService.isExistValidLogin();
    if(isLogin === true){
      history.push('/dashboard', {replace: true}, [history]);
    }

  };

  const checkFragments = () => {
    const { hash } = window.location;
    if(!hash.startsWith("#")){
        return;
    }
    const result = {};
    const query = hash.replace("#","");
    query.split('&').forEach(function(part) {
        const item = part.split('=');
        result[item[0]] = decodeURIComponent(item[1]);
      });
    ssoLogin(result.state,result.access_token,result.id_token);

    // clear fragments
    //window.history.pushState("", document.title, window.location.pathname + window.location.search);
  };

  const ssoLogin = (state, accessToken,idToken) => {
    LoginService.ssoLogin(state, accessToken,idToken)
      .then((response) => {
        PageGuardService.createCookie(response.data.email,response.data.token,response.data.expiresAt);
      })
      .catch((error) => {
        setIsError(true);
        setErrorMes(error?.response?.data.message)
      });
  };

  const handleLoginSubmit = () => {
    if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/)){
      setIsError(true);
      setErrorMes("e-mail address not valid!");
      return;
    } else if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/)){
      setIsError(true);
      setErrorMes("password should contain: 1. one upper char 2. one lower char 3. one number 4. special (@#$!%*?&) char 5. at least 8 characters");
      return;
    }
    setIsError(false);
    setErrorMes("")
    postLoginData();
  };

  const postLoginData = () => {
    LoginService.login(email,password)
     .then((response) => {
       setPassword("")
       setIsError(false);
       setErrorMes("");
       PageGuardService.createCookie(response.data.email,response.data.token,response.data.expiresAt);

       if(response.data.emailVerify === true){
        history.push('/dashboard', {replace: true}, [history]);
       }else{
        history.push('/remail', {replace: true}, [history]);
       }
     })
     .catch((error) => {
       setPassword("")
       setIsError(true);
       setErrorMes(error?.response?.data)
     });
  };

  const getSSOConfig = (provider) => {
    history.push('/', {replace: true}, [history]);
    LoginService.getSSOConfig()
     .then((response) => {
       setIsError(false);
       setErrorMes("")
       if(provider === 'google'){
        window.location.replace(response.data.google);
       }else if(provider === 'facebook'){
        window.location.replace(response.data.facebook);
       }
     })
     .catch((error) => {
       setIsError(true);
       setErrorMes(error?.response?.data.message)
     });
  };

  const handleSignupSubmit = useCallback(() => history.push('/signup', {replace: true}), [history]);

  const handleGoogleSSOClick = (e) => {
    getSSOConfig('google');
  };
  const handleFacebookSSOClick = (e) => {
    getSSOConfig('facebook');
  };

  useEffect(() => {
    checkLogin();
    checkFragments();
  }, [window.location]);

  return (
    <div >
        <form  method="post" id="LoginForm" >
          <div className="box">
              <div className="h2">Login Panel</div>
              <div className="col-xs-12">
                  <input type="text" name="txtEmail" placeholder="E-mail" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div class="form-input-password">
                  <input type="password" name="txtPassword" placeholder="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className="error">{errorMes}</div>
              <div className="loingBtn" type="submit" onClick={handleLoginSubmit}>Login</div>
              <div className="loingBtn" type="submit" onClick={handleSignupSubmit}>Signup</div>
              <div className="loingBtn" type="submit" onClick={handleGoogleSSOClick}>Login By Google</div>
              <div className="loingBtn" type="submit" onClick={handleFacebookSSOClick}>Login By Facebook</div>
          </div>
        </form>
    </div>
  );
}