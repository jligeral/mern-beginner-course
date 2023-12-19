import express from "express";
import {createNote, getNotes, getNote } from "../controllers/notes-controller";

const router = express.Router();

router.get('/', getNotes);

router.get('/:noteId', getNote);

router.post('/', createNote)

export default router;