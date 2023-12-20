import {RequestHandler} from "express";
import noteSchema from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await noteSchema.find().exec();
    // If notes found, return them
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
}

export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    // Check if note ID is valid
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note ID');
    }
    const note = await noteSchema.findById(noteId).exec();
    // If note not found, throw error
    if (!note) {
      throw createHttpError(404, 'Note not found');
    }
    // If note found, return it
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
}

/* The interface defines the type of the request body */
interface CreateNoteBody {
  /* The question mark indicates that the field is optional */
  text?: string;
  title?: string;
}

export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
  const text = req.body.text;
  const title = req.body.title;
  try {
    if (!title) {
      throw createHttpError(400, 'Title is missing from note');
    }
    const newNote = await noteSchema.create({
      text: text,
      title: title,
    });
    // If note created successfully, return it
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
}
