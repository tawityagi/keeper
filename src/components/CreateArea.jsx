import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

function CreateArea(props) {
  const [isExpanded,setExpanded] = useState(false);
  const [note,setNote] = useState({
      title:"",
      content:""
  });
  function  handleChange(event) {
      const {name,value}= event.target;
      setNote(prevValue => {
          return {
              ...prevValue,
              [name]: value
          }
      })
  }
  function submitNote(event) {
      props.onAdd(note);
      setNote({
        title:"",
        content:""
    });
      event.preventDefault();
  }
  function expand() {
    setExpanded(true);
  }
  return (
    <div>
      <form className="create-note">
        {
          isExpanded && (<input name="title" placeholder="Title" value={note.title} onChange={handleChange} /> )
        }
        <textarea name="content" placeholder="Take a note..." rows={isExpanded ? 3 : 1} value={note.content} onChange={handleChange}
        onClick={expand} />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
          <AddIcon />
          </Fab>
        </Zoom> 
      </form>
    </div>
  );
}

export default CreateArea;
