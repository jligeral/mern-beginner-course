import { useForm } from "react-hook-form";
import { User } from "../models/user";
import {SignUpCredentials} from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { Modal, Form, Button } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";

interface SignUpModalProps {
  onDismiss: () => void, // <-- function to call when the modal is dismissed
  onSignUpSuccess: (user: User) => void, // <-- function to call when a new user is signed up
}

const SignUpModal = ({ onDismiss, onSignUpSuccess } : SignUpModalProps) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpCredentials>();

  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await NotesApi.signUp(credentials);
      onSignUpSuccess(newUser);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
          Sign Up
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="signUpForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholder="Enter username"
            register={register}
            registerOptions={{ required: "Required" }} // <-- ensures that the username is not empty
            error={errors.username}
          />

          <TextInputField
            name="email"
            label="Email"
            type="email"
            placeholder="Enter email"
            register={register}
            registerOptions={{ required: "Required" }} // <-- ensures that the email is not empty
            error={errors.email}
          />

          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Enter password"
            register={register}
            registerOptions={{ required: "Required" }} // <-- ensures that the password is not empty
            error={errors.password}
          />

          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting}>
            className={styleUtils.width100}
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
