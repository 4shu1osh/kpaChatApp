const strings = {
  bio: 'Bio',
  next: 'next',
  name: 'Name',
  save: 'Save',
  email: 'Email',
  phone: 'Phone',
  cancel: 'Cancel',
  profile: 'Profile',
  sign_in: 'Sign in',
  sign_up: 'Sign up',
  welcome: 'Welcome',
  sign_out: 'Sign out',
  register: 'Register',
  password: 'Password',
  full_name: 'Full Name',
  add_name: 'Add a name',
  logged_in: 'Logged in',
  logged_out: 'Logged out',
  delete_user: 'Delete user',
  email_phone: 'Email/Phone',
  agree: 'Agree and continue',
  edit_profile: 'Edit Profile',
  user_deleted: 'User deleted',
  phone_number: 'Phone Number',
  update_email: 'Update email',
  invalid_name: 'Invalid name',
  error: 'Something went wrong',
  invalid_email: 'Invalid email',
  add_phone: 'Add a phone number',
  add_email: 'Add an email address',
  upload_success: 'Upload Successful',
  confirm_password: 'Confirm password',
  login_password: 'Enter your password',
  welcome_message: 'Welcome to KPA Chat',
  enter_password: "Password can't be empty",
  dont_have_account: "Don't have an account?",
  password_not_match: "Passwords don't match",
  enter_phone_email: "Phone/email can't be empty",
  invalid_phone: 'Phone number must be 10 digits',
  upload_profile_picture: 'Upload profile picture',
  complete_your_profile: 'Complete your profile',
  already_have_account: 'Already have an account?',
  profile_picture_updated: 'Profile picture updated',
  password_no_space: "Password can't contain spaces",
  login_text: 'Sign In Using Your  Mobile Number / Email',
  password_length: 'Password must be at least 8 characters',
  password_number: 'Password must contain at least one number',
  password_max_length: 'Password must be at most 20 characters',
  bio_placeholder: 'Hello, I am a UI/UX developer. I love to create things.',
  password_special: 'Password must contain at least one special character',
  password_uppercase: 'Password must contain at least one uppercase letter',
  data_charges:
    'KPA Chat will verify your email/phone. Standard charges may apply.',
  privacy_policy:
    'Read our Privacy Policy. Tap "Agree and continue" to accept the Terms and Services',
  invalid_password:
    'Password must be at least 8 characters long, contain at least one number, one uppercase letter and one special character',
};

const toUpperCase = (str: string) => {
  return str.toUpperCase();
};

const toLowerCase = (str: string) => {
  return str.toLowerCase();
}

export {strings, toUpperCase, toLowerCase};
