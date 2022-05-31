import {
  isLoggedIn,
  setAuthTokens,
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
} from "react-native-axios-jwt";
import axios from "axios";

// 4. Log in by POST-ing the email and password and get tokens in return
// and call setAuthTokens with the result.
export const login = async (username, password) => {
  let body = { username, password };
  axios
    .post("http://localhost:3000/users/login", body)
    .then((res) => {
      console.log("REsponse of login api:", res);
    })
    .catch((err) => console.log("Error of login api:", String(err)));
  // save tokens to storageexpo
  //   await setAuthTokens({
  //     accessToken: response.data.access_token,
  //     refreshToken: response.data.refresh_token,
  //   });
};

// 5. Log out by clearing the auth tokens from AsyncStorage
const logout = () => clearAuthTokens();

// Check if refresh token exists
if (isLoggedIn()) {
  // assume we are logged in because we have a refresh token
}

// Get access to tokens
const accessToken = getAccessToken().then((accessToken) =>
  console.log(accessToken)
);
const refreshToken = getRefreshToken().then((refreshToken) =>
  console.log(refreshToken)
);
