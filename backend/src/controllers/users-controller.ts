import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import UserSchema from '../models/user';
import bcrypt from 'bcrypt';


/* This function is used to obtain the authenticated user */
export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {
    if (!authenticatedUserId) {
      throw createHttpError(401, 'User not authenticated');
    }

    const authenticatedUser = await UserSchema.findById(authenticatedUserId).select('+email').exec();
    if (!authenticatedUser) {
      throw createHttpError(401, 'Not authenticated');
    }

    res.status(200).json(authenticatedUser);
  } catch (error) {
    next(error);
  }
};

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const rawPassword = req.body.password;

  try {
    if (!username || !email || !rawPassword) {
      throw createHttpError(400, 'Missing username, email or password');
    }

    const existingUsername = await UserSchema.findOne({ username: username }).exec();
    if (existingUsername) {
      throw createHttpError(409, 'Username already exists. Please choose another one.');
    }

    const existingEmail = await UserSchema.findOne({ email: email }).exec();
    if (existingEmail) {
      throw createHttpError(409, 'A user with this email already exists. Please log in instead.');
    }
    /* rawPassword is hashed with bcrypt prior to being stored in the database */
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const newUser = await UserSchema.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!username || !password) {
      throw createHttpError(400, 'Missing username or password');
    }

    const user = await UserSchema.findOne({ username: username }).select('+password +email').exec();
    /* If user not found, throw error */
    if (!user) {
      /* This error message is intentionally vague to prevent username enumeration attacks */
      throw createHttpError(401, 'Invalid username or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw createHttpError(401, 'Invalid username or password');
    }

    req.session.userId = user._id;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};
