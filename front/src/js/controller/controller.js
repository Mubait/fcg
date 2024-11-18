import { users } from "./routes/users";


const controller = {
  signup:(userData) => {
    users.axiosPostUsersSignup(userData)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}

export { controller }