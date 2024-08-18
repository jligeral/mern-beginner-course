import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LoginCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import {Modal, Form, Button, Alert} from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";
import { useState } from "react";
import { UnauthorizedError } from "../errors/http_errors";

interface LoginModalProps {
  onDismiss: () => void, // <-- function to call when the modal is dismissed
  onLoginSuccess: (user: User) => void, // <-- function to call when a new user is signed up
}

const LoginModal = ({ onDismiss, onLoginSuccess } : LoginModalProps) => {
  const [ errorText, setErrorText ] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>();

  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await NotesApi.login(credentials);
      onLoginSuccess(user);
    } catch (error) {
        if (error instanceof UnauthorizedError) {
          setErrorText(error.message);
        }
        else {
          alert(error);
        }
        console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
          Login
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {errorText &&
          <Alert variant="danger">
            {errorText}
          </Alert>
        }
        <Form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
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
            disabled={isSubmitting}
            className={styleUtils.width100}
          >
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;