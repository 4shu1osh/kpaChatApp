const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

const validatePassword = (password: string) => {
  return String(password).match(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  );
};

const validateConfirmPassword = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
};

const validatePhone = (phone: number) => {
  return String(phone).match(/^\d{10}$/);
};

const validateName = (name: string) => {
  return String(name).match(/^[a-zA-Z ]+$/);
};

export {
  validateName,
  validateEmail,
  validatePhone,
  validatePassword,
  validateConfirmPassword,
};
