import api from "./index";
import baseUrl from "./config";
import { csrfCookie } from "./index";

const apis = {
  get: {
    csrfCookie: () => csrfCookie(),
  },
  put: {},
  post: {
    register: (registrationData) => {
      return api({
        method: "POST",
        url: `${baseUrl}/api/register`,
        data: registrationData,
      });
    },
    login: (loginData) => {
      return api({
        method: "POST",
        url: `${baseUrl}/api/login`,
        data: loginData,
      });
    },
    logout: () => {
      return api({
        method: "POST",
        url: `${baseUrl}/api/logout`,
      });
    },
  },
  delete: {},
};

export default apis;
