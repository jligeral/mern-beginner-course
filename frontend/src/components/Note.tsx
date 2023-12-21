import styles from "../styles/Note.module.css";
import { Note as NoteSchema } from "../models/note";
import { Card } from "react-bootstrap";
import { formatDate } from "../util/formatDate";

interface NoteProps {
  note: NoteSchema,
  /* className prop allows us to add additional classes to the component */
  className?: string,
}

const Note = ({ note, className }: NoteProps) => {
  /* Destructure the note object */
  const {
    title,
    text,
    createdAt,
    updatedAt,
  } = note;

  let createdUpdatedText: string;
  if (createdAt < updatedAt) {
    createdUpdatedText = 'Updated: ' + formatDate(updatedAt);
  }
  else {
    createdUpdatedText = 'Created: ' + formatDate(createdAt);
  }

  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>
          {title}
        </Card.Title>
        <Card.Text className={styles.cardText}>
          {text}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        {createdUpdatedText}
      </Card.Footer>
    </Card>
  )

};

export default Note;
