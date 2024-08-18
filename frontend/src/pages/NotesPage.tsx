import styles from "../styles/NotesPage.module.css";
import NotesPageLoggedInView from "../components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "../components/NotesPageLoggedOutView";
import {Container} from "react-bootstrap";
import React from "react";
import {User} from "../models/user";

interface NotesPageProps {
  loggedInUser: User | null;
}

const NotesPage = ({loggedInUser}: NotesPageProps) => {
  return (
    <Container className={styles.notesPage}>
      <>
        {loggedInUser // Check if user is logged in and display appropriate page view
          ? <NotesPageLoggedInView />
          : <NotesPageLoggedOutView />
        }
      </>
    </Container>
  );
}

export default NotesPage;