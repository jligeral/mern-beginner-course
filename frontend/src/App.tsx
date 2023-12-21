import React, {useEffect, useState} from 'react';
import { Note as NoteSchema } from './models/note';
import Note from "./components/Note";

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
    <div className="App">
      {notes.map((note) => (
        <Note note={note} key={note._id} />
      ))}
    </div>
  );
}

export default App;
