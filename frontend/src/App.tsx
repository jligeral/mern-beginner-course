import React, {useEffect, useState} from 'react';
import { Note as NoteSchema } from './models/note';
import Note from "./components/Note";
import {Button, Col, Container, Row, Spinner} from 'react-bootstrap';
import styles from './styles/NotesPage.module.css';
import styleUtils from './styles/utils.module.css';
import * as NotesApi from './network/notes_api';
import CreateEditNote from './components/CreateEditNote';
import {FaPlus} from "react-icons/fa";

function App() {
  /* Initialize the notes state with an empty array */
  const [notes, setNotes] = useState<NoteSchema[]>([]);

  const [showCreateNote, setShowCreateNote] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteSchema | null>(null);
  const [notesLoading, setNotesLoading] = useState(false);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  useEffect(() => {
    async function getNotes() {
      try {
        setShowNotesLoadingError(false); // <-- hide the error message
        setNotesLoading(true); // <-- show the loading spinner
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);

      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally { // <-- this block of code will always run
        setNotesLoading(false); // <-- hide the loading spinner
      }
    }
    getNotes();
  }, []); // <-- empty dependency array to ensure effect is only run once

  async function deleteNote (note: NoteSchema) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter(existingNote => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const notesGrid =
      <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
        {notes.map((note) => (
          <Col key={note._id}> {/* The key is a unique identifier to each note */}
            <Note
              note={note}
              className={styles.note}
              onDeleteNoteClicked={deleteNote}
              onNoteClicked={setNoteToEdit}
            />
          </Col>
        ))}
      </Row>

  return (
    <Container className={styles.notesPage}>
      <Button
        className={`mb-3 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowCreateNote(true)}>
        <FaPlus />
        Create New Note
      </Button>
      {notesLoading && <Spinner animation="border" variant="primary" />}
      {showNotesLoadingError && <p>Error loading notes. Try refreshing.</p>}
      {!notesLoading && !showNotesLoadingError &&
      <> {/* React fragment used to put curly braces inside curly braces */}
        {notes.length > 0
          ? notesGrid
          : <p>There are no notes to show yet</p>
        }
      </>
      }
      {
        showCreateNote &&
        <CreateEditNote
          onDismiss={() => setShowCreateNote(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]); // <-- add the new note to the notes state
            setShowCreateNote(false); // <-- close the modal
          }}
        />
      }
      {
        noteToEdit &&
        <CreateEditNote
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote));
            setNoteToEdit(null);
          }}
        />
      }
    </Container>
  );
}

export default App;
