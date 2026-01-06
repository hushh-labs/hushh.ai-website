import appleSignIn from "./appleSignIn";
import googleSignIn from "./googleSignIn";
import getUserDetails from "./getUserDetails";
import signOut from "./signOut";
import isLoggedIn from "./isLoggedIn";
import getSession from "./getSession";
import mfaService from "./mfaService";

const authentication = {
  appleSignIn: appleSignIn,
  googleSignIn: googleSignIn,
  getUserDetails: getUserDetails,
  signOut: signOut,
  isLoggedIn: isLoggedIn,
  getSession: getSession,
  mfa: mfaService,
};

export default authentication; 
