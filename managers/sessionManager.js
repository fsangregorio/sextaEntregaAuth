
import UserDao from "../daos/mongo/userDao.js";
import { createHash, isValidPassword } from "../utils/encrypt.js";

class SessionManager {
  constructor() {
    this.userDao = new UserDao();
  }

  async login(email, password) {
    const user = await this.userDao.getUserByEmail(email);
    const isPasswordCorrect = await isValidPassword(password, user.password);
    if (!isPasswordCorrect) throw new Error("The password is incorrect. Please, try again");
    return user;
  }

  async signup(user) {
    const { email, password, role } = user;
    const encryptedPassword = await createHash(password);
    const newUser = {
      email,
      password: encryptedPassword,
      role,
    };
    return await this.userDao.createUser(newUser);
  }
}

export default SessionManager;
