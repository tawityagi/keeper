import React from "react";
import { Delete, Edit } from '@material-ui/icons';

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={()=>{props.onEdit(props.id)}}>
      <Edit />
      </button>
      <button onClick={handleClick}>
      <Delete />
      </button>
    </div>
  );
}

export default Note;