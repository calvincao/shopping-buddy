import React from "react";

const Title = (props) => {
  return (
    <div>
      <input type="text" defaultValue={props.title} className="title" />
    </div>
  )
}

export default Title;