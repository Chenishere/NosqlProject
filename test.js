// Installez Firebase en utilisant npm install firebase
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

// Configurez Firebase avec vos propres informations de projet
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    const unsubscribe = db.collection("notes").onSnapshot((snapshot) => {
      const updatedNotes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(updatedNotes);
    });

    return () => unsubscribe();
  }, []);

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleNoteSubmit = () => {
    if (newNote.trim() !== "") {
      db.collection("notes").add({
        content: newNote,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setNewNote("");
    }
  };

  return (
    <div>
      <h1>Collaborative Notes App</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
      <textarea
        value={newNote}
        onChange={handleNoteChange}
        placeholder="Type your note..."
      />
      <button onClick={handleNoteSubmit}>Add Note</button>
    </div>
  );
};

export default NoteApp;
