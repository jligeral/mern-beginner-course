import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import styles from './styles/NotesPage.module.css';
import SignUpModal from './components/SignUpModal';
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import { User } from './models/user';
import * as NotesApi from './network/notes_api';
import NotesPageLoggedInView from "./components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "./components/NotesPageLoggedOutView";

function App() {

  const [loggedInUser, setLoggedInUser] = useState<User|null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
          const user = await NotesApi.getLoggedInUser();
          setLoggedInUser(user);
      } catch (error) {
          console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLoginClicked={() => setShowLoginModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />
      <Container className={styles.notesPage}>
        <>
          {loggedInUser // Check if user is logged in and display appropriate page view
            ? <NotesPageLoggedInView />
            : <NotesPageLoggedOutView />
          }
        </>
      </Container>
      {
        showSignUpModal &&
        <SignUpModal
          onDismiss={() => setShowSignUpModal(false)}
          onSignUpSuccess={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false)
          }}
        />
      }
      {
        showLoginModal &&
        <LoginModal
          onDismiss={() => setShowLoginModal(false)}
          onLoginSuccess={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false)
          }}
        />
      }
    </div>
  );
}

export default App;
