
import SessionManager from "../managers/sessionManager.js";
import { z } from "zod";
import loginValidation from "../validations/loginValidation.js";

const manager = new SessionManager();

const signup = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await manager.signup(req.body);
    req.session.user = { email };
    return res.status(200).json({
      message: "You have signed up successfully.",
      payload: { ...result, password: undefined },
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      status: "Error",
      error: error.message,
    });
  }
};

const signupPaspport = async (req, res, next) => {
  try {
    return res.status(200).json({
      status: "Success",
      message: "Successful signup!",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await manager.login(email, password);
    req.session.user = { email };
    if (result.role === "admin") {
      req.session.admin = true;
    }
    return res.status(200).json({
      message: "You have logged up successfully.",
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      status: "Error",
      error: error.message,
    });
  }
};

const loginPassport = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "Error",
        message: "You're not cleared to see this. Please, contact supervisor.",
      });
    }
    const { email, role } = req.user;

    req.session.user = { email, role };
    if (role === "admin") {
      req.session.admin = true;
    }

    return res.status(200).json({
      status: "Success",
      message: "Successful login!",
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (!err) {
        return res.status(200).json({
          message: "You have logged out successfully.",
        });
      }
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      status: "Error",
      error: error.message,
    });
  }
};

export { login, logout, signup, signupPaspport, loginPassport, };
