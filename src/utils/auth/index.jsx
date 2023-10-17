import cookie from "js-cookie";

export const setToken = (token) => {
  cookie.set("token", token);
  return true;
};
export const setUser = (user) => {
  cookie.set("user", JSON.stringify(user));
  return true;
};
export const logout = () => {
  cookie.remove("token");
  cookie.remove("user");

  if (typeof window != "undefined") {
    window.localStorage.setItem("logout", Date.now().toString());
  }
};
export const getCurrentToken = () => {
  const token = cookie.get("token");
  if (token !== "undefined") {
    if (token) {
      return token;
    } else {
      logout();
    }
  }
};
export const getCurrentUser = () => {
  const user = cookie.get("user");
  if (typeof user !== "undefined") {
    if (JSON.parse(user)) {
      return JSON.parse(user);
    } else {
      logout();
    }
  }
};
