import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import UserSchema from '../models/user';
import bcrypt from 'bcrypt';

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
}