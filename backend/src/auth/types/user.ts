interface UserRegister {
  username: string;
  password: string;
  passwordConfirm: string;
}

interface UserLogin {
  username: string;
  password: string;
}

interface UserUpdate {
  uuid: string;
  username?: string;
  password?: string;
}

interface User {
  uuid: string;
  username: string;
  password: string;
}

export { UserRegister, UserLogin, UserUpdate, User };
