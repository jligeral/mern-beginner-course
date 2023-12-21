import styles from "../styles/Note.module.css";
import { Note as NoteSchema } from "../models/note";
import { Card } from "react-bootstrap";

interface NoteProps {
  note: NoteSchema,
}

const Note = ({ note }: NoteProps) => {
  /* Destructure the note object */
  const {
    title,
    text,
    createdAt,
    updatedAt,
  } = note;
  return (
    <Card className={styles.noteCard}>
      <Card.Body>
        <Card.Title>
          {title}
        </Card.Title>
        <Card.Text className={styles.cardText}>
          {text}
        </Card.Text>
      </Card.Body>
    </Card>
  )

};

export default Note;
