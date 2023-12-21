import React, {useEffect, useState} from 'react';
import { Note as NoteSchema } from './models/note';
import Note from "./components/Note";
import {Col, Container, Row} from "react-bootstrap";
import styles from "./styles/NotesPage.module.css";

function App() {
  /* Initialize the notes state with an empty array */
  const [notes, setNotes] = useState<NoteSchema[]>([]);

  useEffect(() => {
    async function getNotes() {
      try {
        const response = await fetch('/api/notes', { method: 'GET' });
        const notes = await response.json();
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
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
