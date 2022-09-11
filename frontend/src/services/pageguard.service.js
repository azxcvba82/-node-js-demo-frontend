import Cookies from 'universal-cookie';

// displays a page header
class PageGuardService {

  static createCookie(email,token,expiresAt) {
    const cookies = new Cookies();
  
    cookies.set('email', email, { path: '/',secure: true,sameSite :true});
    cookies.set('token', token, { path: '/',secure: true,sameSite :true});
    cookies.set('expiresAt', expiresAt, { path: '/',secure: true,sameSite :true});
  }

  static clearCookie() {
    const cookies = new Cookies();
  
    cookies.set('email', '', { path: '/',secure: true,sameSite :true});
    cookies.set('token', '', { path: '/',secure: true,sameSite :true});
    cookies.set('expiresAt', '', { path: '/',secure: true,sameSite :true});
  }

  static isExistValidLogin() {
    const cookies = new Cookies();
  
    if (cookies.get('token')===undefined || cookies.get('token')=== ''){
      this.clearCookie();
      return false;
    }else{
      let currentTime = Math.floor(new Date().getTime()/1000);
      let expireTime = Math.floor(new Date(cookies.get('expiresAt')).getTime()/1000);
      let expireDuration = expireTime -currentTime;
  
      if(expireDuration < 0){
        this.clearCookie();
        return false;
      }
      return true;
    }
  }


}
 
export default PageGuardService 