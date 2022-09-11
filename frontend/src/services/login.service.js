import axios from 'axios';
import {
  environment
} from "../environment";

// displays a page header
class LoginService {
  static login(email, password) {
    return axios.post(environment.production.apiEndpoint +'/login',{
      email,
      password
   })
  }
  static signup(email, password) {
    return axios.put(environment.production.apiEndpoint +'/signup',{
      email,
      password
   })
  }
  static verifyToken(token) {
    return axios.post(environment.production.apiEndpoint +'/verify',{token:token})
  }
  static getSSOConfig() {
    return axios.get(environment.production.apiEndpoint +'/getSSOConfig')
  }
  static ssoLogin(state, accessToken, idToken) {
    return axios.post(environment.production.apiEndpoint +'/ssoLogin',{state:state, access_token:accessToken,id_token:idToken})
  }

}
 
export default LoginService 