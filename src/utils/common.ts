const strings = {
  next: 'next',
  password: 'Password',
  email_phone: 'Email/Phone',
  agree: 'Agree and continue',
  invalid_email: 'Invalid email',
  login_text: 'Enter your phone/email',
  login_password: 'Enter your password',
  invalid_password: 'Invalid password',
  invalid_phone: 'Invalid phone number',
  welcome_message: 'Welcome to KPA Chat',
  enter_password: 'Password can\'t be empty',
  enter_phone_email: 'Phone/email can\'t be empty',
  password_no_space: 'Password can\'t contain spaces',
  password_length: 'Password must be at least 8 characters',
  password_number: 'Password must contain at least one number',
  password_special: 'Password must contain at least one special character',
  password_uppercase: 'Password must contain at least one uppercase letter',
  privacy_policy:
    'Read our Privacy Policy. Tap "Agree and continue" to accept the Terms and Services',
};

const toUpperCase = (str: string) => {
  return str.toUpperCase();
};

export {strings, toUpperCase};
