import express from "express";
import {createNote, getNotes, getNote, updateNote, deleteNote} from "../controllers/notes-controller";

const router = express.Router();

/* Each router below defines an endpoint */

router.get('/', getNotes);

router.get('/:noteId', getNote);

router.post('/', createNote)

router.patch('/:noteId', updateNote);

router.delete('/:noteId', deleteNote);

export default router;