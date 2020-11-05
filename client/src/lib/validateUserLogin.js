import axios from 'axios';

const validateUserLogin = async (username, password) => {
  try {
    const { data } = await axios.get('/data/users.json');
    let error;
    const findUser = data.users.find(user => user.username === username);

    if(!findUser) {
      error = 'Username not found';
    }

    if(findUser.password !== password) {
      error = 'Password not valid';
    }

    return { user: findUser, error };
    
  } catch (error) {
    console.log(error);
  }
}

export default validateUserLogin;