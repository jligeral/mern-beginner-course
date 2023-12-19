import {RequestHandler} from "express";
import noteSchema from "../models/note";

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
    const note = await noteSchema.findById(noteId).exec();
    // If note found, return it
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
}

export const createNote: RequestHandler = async (req, res, next) => {
  const text = req.body.text;
  const title = req.body.title;
  try {
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
