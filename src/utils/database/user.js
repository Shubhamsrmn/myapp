// This will store all the user details for login the user successfully
const user = {
  email: "shubham@gmail.com",
  password: "123456",
};
// this is for verifying user here is simple we can user data base were password is encrypted but is for demo we are using user obj
export function verifiedUser(email, password) {
  if (user.email === email && user.password === password) return true;
  return false;
}
