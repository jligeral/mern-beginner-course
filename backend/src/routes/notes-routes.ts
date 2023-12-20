import express from "express";
import {createNote, getNotes, getNote, updateNote} from "../controllers/notes-controller";

const router = express.Router();

router.get('/', getNotes);

router.get('/:noteId', getNote);

router.post('/', createNote)

router.patch('/:noteId', updateNote);

export default router;