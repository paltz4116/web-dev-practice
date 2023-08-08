function isEmpty(value) {
  return !value || value.trim() === ``;
}

function userCredentialVaild(email, password) {
  return email && email.includes(`@`) && password && password.trim().length > 5;
}

function userDetailsValid(email, password, name, street, postal, city) {
  return (
    userCredentialVaild(email, password) &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(postal) &&
    !isEmpty(city)
  );
}

function emailIsConfirmed(email, confirmedEmail) {
  return email === confirmedEmail;
}

module.exports = {
  userDetailsValid: userDetailsValid,
  emailIsConfirmed: emailIsConfirmed,
};
