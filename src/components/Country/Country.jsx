import React from "react";

function Country(props) {
  return (
    
      <tr>
        <th scope="row">{props.index}</th>
        <td>{props.item.country}</td>
        <td>{props.item.cases}</td>
        <td>{props.item.deaths}</td>
        <td>{props.item.recovered}</td>
      </tr>
    
  );
}

export default React.memo(Country);
