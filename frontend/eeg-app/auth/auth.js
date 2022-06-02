import { Alert } from "react-native";
import {
  isLoggedIn,
  setAuthTokens,
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
} from "react-native-axios-jwt";
import { axiosInstance } from "../utils/api";

// 4. Log in by POST-ing the email and password and get tokens in return
// and call setAuthTokens with the result.
export const login = async (username, password, setSignedIn) => {
  let body = { username, password };
  axiosInstance
    .post("/users/login", body)
    .then((res) => {
      // SUCCESSFULL LOGIN
      console.log("Response of login api:", res);
      setAuthTokens({
        accessToken: res.data.token,
        refreshToken: res.data.token,
      }).then(() => {
        getAccessToken().then((token) => {
          console.log("ACCESS_TOKEN: ", token);

          setSignedIn(true);
        });
      });
    })
    .catch((err) => {
      console.log(err);
      //UNSUCCESSFULL LOGIN
      clearAuthTokens().then(() => {
        // setAuthTokens({
        //   accessToken: "testtoken",
        //   refreshToken: "testtoken",
        // });
        //should be false here doing true for testing only
        // setSignedIn(true);
        setSignedIn(false);
        Alert.alert("Wrong username and password!");
      });
    });
};

// 5. Log out by clearing the auth tokens from AsyncStorage
export const logout = (setSignedIn) => {
  setSignedIn(false);
  clearAuthTokens();
};

// Check if refresh token exists
if (isLoggedIn()) {
  // assume we are logged in because we have a refresh token
}

// Get access to tokens
export const accessToken = getAccessToken().then((accessToken) =>
  console.log(accessToken)
);
export const refreshToken = getRefreshToken().then((refreshToken) =>
  console.log(refreshToken)
);
