import env from "../../config/env";
import fetch, { fmt } from "../../utils/api";

const router = {
  login: `${env.API_URL}/auth/login`,
  getMe: `${env.API_URL}/auth/me`,
};

class AuthService {
  static login(params) {
    let uri = router.login;
    return fetch.post(uri, params);
  }
  static getMe(token) {
    let uri = router.getMe;
    return fetch.get(uri, token);
  }
}

export default AuthService;
