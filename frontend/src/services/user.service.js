import axios from 'axios';
import {
  environment
} from "../environment";

// displays a page header
class UserService {

  static reSendMail() {
    return axios.get(environment.production.apiEndpoint +'/users/reSentMail')
  }

  static getUserProfile() {
    return axios.get(environment.production.apiEndpoint +'/users/getUserProfile')
  }

  static changeName(name) {
    return axios.post(environment.production.apiEndpoint +'/users/changeName',{name:name})
  }

  static resetPassword(oldPassword, newPassword) {
    return axios.post(environment.production.apiEndpoint +'/users/resetPassword',{oldPassword:oldPassword, newPassword:newPassword})
  }

  static queryUsersStatus() {
    return axios.get(environment.production.apiEndpoint +'/users/queryUsersStatus')
  }

  static queryUsersHaveSignup() {
    return axios.get(environment.production.apiEndpoint +'/users/queryUsersHaveSignup')
  }

  static queryUsersHaveActiveSessionToday() {
    return axios.get(environment.production.apiEndpoint +'/users/queryUsersHaveActiveSessionToday')
  }

  static queryAverageActiveSessionInLast7Day() {
    return axios.get(environment.production.apiEndpoint +'/users/queryAverageActiveSessionInLast7Day')
  }

}
 
export default UserService 