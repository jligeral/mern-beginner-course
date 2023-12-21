import React, {useEffect, useState} from 'react';
import { Note as NoteSchema } from './models/note';
import Note from "./components/Note";
import {Button, Col, Container, Row} from 'react-bootstrap';
import styles from './styles/NotesPage.module.css';
import styleUtils from './styles/utils.module.css';
import * as NotesApi from './network/notes_api';
import CreateNote from './components/CreateNote';

function App() {
  /* Initialize the notes state with an empty array */
  const [notes, setNotes] = useState<NoteSchema[]>([]);

  const [showCreateNote, setShowCreateNote] = useState(false);

  useEffect(() => {
    async function getNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);

      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    getNotes();
  }, []); // <-- empty dependency array to ensure effect is only run once

  return (
    <Container>
      <Button
        className={`mb-3 ${styleUtils.blockCenter}`}
        onClick={() => setShowCreateNote(true)}>
        Create New Note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}> {/* The key is a unique identifier to each note */}
            <Note note={note} className={styles.note} />
          </Col>
        ))}
      </Row>
      {
        showCreateNote &&
        <CreateNote
          onDismiss={() => setShowCreateNote(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]); // <-- add the new note to the notes state
            setShowCreateNote(false); // <-- close the modal
          }}
        />
      }
    </Container>
  );
}

export default App;
