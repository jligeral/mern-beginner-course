import {Button, Form, Modal} from "react-bootstrap";
import { Note } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import TextInputField from "./form/TextInputField";

interface CreateEditNoteProps {
  onDismiss: () => void, // <-- function to call when the modal is dismissed
  onNoteSaved: (note: Note) => void, // <-- function to call when a new note is saved
  noteToEdit?: Note, // <-- optional note to edit
}
const CreateEditNote = ({ onDismiss, onNoteSaved, noteToEdit }: CreateEditNoteProps) => {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>({
    /* Set default values for the form inputs */
    defaultValues: {
      text: noteToEdit?.text || "",
      title: noteToEdit?.title || "",
    }
  });

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: Note;
      if (noteToEdit) {
        noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
      }
      else {
        noteResponse = await NotesApi.createNote(input);
      }
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
          {noteToEdit ? "Edit Note" : "Create New Note"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="createEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="title"
            label="Title"
            type="text"
            placeholder="Enter title"
            register={register}
            registerOptions={{ required: "Required" }} // <-- ensures that the title is not empty
            error={errors.title}
          />

          <TextInputField
            name="text"
            label="Text"
            as="textarea"
            placeholder="Enter text here"
            rows={5}
            register={register}
          />

        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          type="submit"
          form="createEditNoteForm"
          disabled={isSubmitting} // <-- disables the button until the form is submitted
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateEditNote;
