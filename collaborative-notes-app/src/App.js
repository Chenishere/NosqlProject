import React, { useState } from "react";
import axios from "axios"; // Install axios if not already installed

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const addNote = () => {
    // Make a POST request to save the note to the server
    axios
      .post("http://localhost:3000/save-note", { content: newNote })
      .then((response) => {
        // If successful, update the state with the new note
        setNotes([...notes, { content: newNote }]);
        setNewNote(""); // Clear the textarea
      })
      .catch((error) => {
        console.error("Error saving note:", error);
      });
  };

  return (
    <div>
      <h1>Collaborative Notes App</h1>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note.content}</li>
        ))}
      </ul>
      <textarea
        value={newNote}
        onChange={handleNoteChange}
        placeholder="Type your note..."
      />
      <button onClick={addNote}>Add Note</button>
    </div>
  );
};

export default NoteApp;
