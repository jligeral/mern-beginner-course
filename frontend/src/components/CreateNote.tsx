import {Button, Form, Modal} from "react-bootstrap";
import { Note } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";

interface CreateNoteProps {
  onDismiss: () => void, // <-- function to call when the modal is dismissed
  onNoteSaved: (note: Note) => void, // <-- function to call when a new note is saved
}
const CreateNote = ({ onDismiss, onNoteSaved }: CreateNoteProps) => {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>();

  async function onSubmit(input: NoteInput) {
    try {
      const noteResponse = await NotesApi.createNote(input);
      onNoteSaved(noteResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
          Create New Note
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="createNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              isInvalid={!!errors.title}
              {...register("title", { required: "Required" })} // <-- ensures that the title is not empty
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter text here"
              rows={5}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          type="submit"
          form="createNoteForm"
          disabled={isSubmitting} // <-- disables the button until the form is submitted
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateNote;