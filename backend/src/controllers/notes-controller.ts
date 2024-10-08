import {RequestHandler} from "express";
import noteSchema from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import {assertisDefined} from "../util/assertisDefined";

export const getNotes: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {
    assertisDefined(authenticatedUserId); // Check if authenticatedUserId is defined
    const notes = await noteSchema.find({userId: authenticatedUserId}).exec();
    // If notes found, return them
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  const authenticatedUserId = req.session.userId;
  try {
    assertisDefined(authenticatedUserId); // Check if authenticatedUserId is defined
    // Check if note ID is valid
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note ID');
    }
    const note = await noteSchema.findById(noteId).exec();
    // If note not found, throw error
    if (!note) {
      throw createHttpError(404, 'Note not found');
    }
    // Check if note belongs to authenticated user
    if (!note.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, 'You cannot access this note');
    }
    // If note found, return it
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

/* The interface defines the type of the request body */
interface CreateNoteBody {
  /* The question mark indicates that the field is optional */
  text?: string;
  title?: string;
}

export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
  const text = req.body.text;
  const title = req.body.title;
  const authenticatedUserId = req.session.userId;
  try {
    assertisDefined(authenticatedUserId); // Check if authenticatedUserId is defined
    if (!title) {
      throw createHttpError(400, 'Title is missing from note');
    }
    const newNote = await noteSchema.create({
      userId: authenticatedUserId,
      text: text,
      title: title,
    });
    // If note created successfully, return it
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

interface UpdateNoteParams {
  noteId: string;
}

interface UpdateNoteBody {
  text?: string;
  title?: string;
}

export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newText = req.body.text;
  const newTitle = req.body.title;
  const authenticatedUserId = req.session.userId;
  try {
    assertisDefined(authenticatedUserId); // Check if authenticatedUserId is defined
    // Check if note ID is valid
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note ID');
    }
    if (!newTitle) {
      throw createHttpError(400, 'Title is missing from note');
    }
    const note = await noteSchema.findById(noteId).exec();
    // If note not found, throw error
    if (!note) {
      throw createHttpError(404, 'Note not found');
    }
    if (!note.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, 'You cannot update this note');
    }
    // If note found, update it
    note.text = newText;
    note.title = newTitle;
    const updatedNote = await note.save();
    // If note updated successfully, return it
    res.status(200).json(updatedNote);

  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  const authenticatedUserId = req.session.userId;
  try {
    assertisDefined(authenticatedUserId); // Check if authenticatedUserId is defined
    // Check if note ID is valid
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note ID');
    }
    const note = await noteSchema.findById(noteId).exec();
    // If note not found, throw error
    if (!note) {
      throw createHttpError(404, 'Note not found');
    }
    if (!note.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, 'You cannot delete this note');
    }
    // If note found, delete it
    await note.deleteOne();
    res.sendStatus(204);

  } catch (error) {
    next(error);
  }
};
