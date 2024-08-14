import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import styles from './styles/NotesPage.module.css';
import SignUpModal from './components/SignUpModal';
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";

function App() {

  return (
    <div>
      <NavBar
        loggedInUser={null}
        onSignUpClicked={() => {}}
        onLoginClicked={() => {}}
        onLogoutSuccessful={() => {}}
      />
      <Container className={styles.notesPage}>
        {
          false &&
          <SignUpModal
          onDismiss={() => {}}
          onSignUpSuccess={() => {}}
          />
        }
        {
          false &&
          <LoginModal
            onDismiss={() => {}}
            onLoginSuccess={() => {}}
          />
        }
      </Container>
    </div>
  );
}

export default App;
