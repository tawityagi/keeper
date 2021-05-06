import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [info , setInfo ] = useState([]);

  const [notes,setNotes] = useState(localStorage.getItem('notesLC') ? JSON.parse(localStorage.getItem('notesLC')) : []);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem('notesLC', JSON.stringify(notes));
  }, [notes]);

  function handleOpen(){
    setOpen(true);
  };

  function handleClose(){
    setOpen(false);
  };

  function addNote(newNote, type , id) {
      if(newNote.title === "" || newNote.content=== "" || newNote.title === undefined || newNote.content === undefined ){
        console.log("CASE 2");
        enqueueSnackbar('Please enter title and content', { variant:"warning" });
      } else{
        console.log(newNote);
        if(type === "EDIT"){
          let info = JSON.parse(localStorage.getItem('notesLC'));
          let data = info.map((item , idx) => {
            if(idx === id){
              return {
                ...item,
                title: newNote.title,
                content : newNote.content
              }
            }
            return item;
          })
          setNotes(data)
          localStorage.setItem('notesLC', JSON.stringify(data));
        }else{
          setNotes(prevValue => {
            return [...prevValue, newNote];
          })
        }
      }
  }

  function editNote(id){
    console.log(notes)
    notes.filter((noteItem,index) => {
        if(index === id){
          setInfo({title:noteItem.title, content:noteItem.content, id:id})
        }
    })
    handleOpen();
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        >
         <CreateArea
            onAdd={addNote}
            title={info.title}
            content={info.content}
            close={handleClose}
            type={"EDIT"}
            id={info.id}
          />
      </Modal>
      <CreateArea 
        onAdd={addNote} 
        title={info.title} 
        content={info.content} 
        close={handleClose} 
        type={"ADD"} 
        id={""}
      />
      {notes.map((noteItem,index) => {
          return <Note key={index} id={index} title={noteItem.title} content= {noteItem.content} onEdit = {editNote} onDelete={deleteNote} />
      })}
      <Footer />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default App;