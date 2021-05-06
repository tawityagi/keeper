import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Alert from 'react-popup-alert'

function App() {
  const [notes,setNotes] = useState(localStorage.getItem('notesLC') ? JSON.parse(localStorage.getItem('notesLC')) : []);
  React.useEffect(() => {
    localStorage.setItem('notesLC', JSON.stringify(notes));
  }, [notes]);
  const [alert,setAlert] = useState(false);
  function onCloseAlert(){
    setAlert(false);
  }
  function addNote(newNote) {
      if(newNote.title !== "" && newNote.content !== ""){
        setNotes(prevValue => {
          return [...prevValue, newNote];
        })
      } else{
        setAlert(true);
      }
  }
  function deleteNote(id) {
    setNotes(prevValue => {
        return prevValue.filter((noteItem,index) => {
            return index!==id;
        })
    })
  }
  return (
    <div>
      <Header />
      <Alert
        header={'Empty note'}
        btnText={'Close'}
        text={"Please enter title and content. "}
        type={"warning"}
        show={alert}
        onClosePress={onCloseAlert}
        pressCloseOnOutsideClick={true}
        showBorderBottom={true}
        alertStyles={{}}
        headerStyles={{}}
        textStyles={{}}
        buttonStyles={{}}
      />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem,index) => {
          return <Note key={index} id={index} title={noteItem.title} content= {noteItem.content} onDelete={deleteNote} />
      })}
      <Footer />
    </div>
  );
}

export default App;
