import Auth from '@react-native-firebase/auth';

/**
 * @function logInWithPhoneNumber
 * @description Log in via phone number
 * @param {*} phone
 * @param {*} successCallback
 * @param {*} failureCallback
 */

function logInWithPhoneNumber(
  phone: any,
  successCallback: any,
  failureCallback: any,
) {
  Auth()
    .signInWithPhoneNumber(phone)
    .then((confirmation: any) => {
      successCallback(confirmation);
    })
    .catch((error: any) => {
      console.log(error.code);
      failureCallback(authErrorHandling(error.code));
    });
}

function confirmCode(
  code: any,
  confirm: any,
  successCallback: any,
  failureCallback: any,
) {
  confirm
    .confirm(code)
    .then(successCallback)
    .catch((error: any) => {
      console.log(error.code);
      failureCallback(authErrorHandling(error.code));
    });
}

/**
 * @function authErrorHandling
 * @description Error handling for log in and sign up methods
 * @param {*} errorMsg
 * @returns
 */
const authErrorHandling = (errorMsg: string) => {
  switch (errorMsg) {
    case 'auth/wrong-password':
      return 'Wrong email or password.';
    case 'auth/network-request-failed':
      return 'Network request failed.';
    case 'auth/invalid-email':
      return 'Invalid email.';
    case 'auth/weak-password':
      return 'Weak password.';
    case 'auth/no-current-user':
      return 'No user signed in';
    case 'auth/email-already-in-use':
      return 'Email already exists.';
    default:
      break;
  }
};

export default {
  confirmCode,
  logInWithPhoneNumber,
};
