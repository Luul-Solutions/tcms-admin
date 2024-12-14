import { AuthProvider, HttpError } from "react-admin";
import data from "./users.json";


type User = {
  username: string;
  password: string;
  id: string;
  name: string;
  role: string;
  status: string;
  email: string;
  school: string;
};


const users: User[] = data as User[];

export const authProvider: AuthProvider = {

  login: ({ username, password }) => {
    
    const user = users.find(
      (u) => u.username === username && u.password === password,
    );

    if (user) {
      
      const { password, ...userToPersist } = user;
      localStorage.setItem("user", JSON.stringify(userToPersist));
      return Promise.resolve();
    }


    return Promise.reject(
      new HttpError("Unauthorized", 401, {
        message: "Invalid username or password",
      }),
    );
  },

  logout: () => {
    localStorage.removeItem("user");
    return Promise.resolve();
  },

  checkError: () => Promise.resolve(),

  checkAuth: () =>
    localStorage.getItem("user") ? Promise.resolve() : Promise.reject(),

  getPermissions: () => Promise.resolve(undefined),

  getIdentity: () => {
    const persistedUser = localStorage.getItem("user");
    const user = persistedUser ? JSON.parse(persistedUser) : null;
    return Promise.resolve(user);
  },
};

export default authProvider;
