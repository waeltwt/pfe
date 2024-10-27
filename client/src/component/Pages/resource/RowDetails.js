import React from 'react';
import { Link } from 'react-router-dom';

const RowDetails = ({ email, name, phoneNumber, skill,  zip,  state, city, Id, OnDelete, role }) => {


  return (
    <tr>
      <th>{email}</th>
      <td>{name}</td>
      <td>{phoneNumber}</td>
      <td>{skill}</td>
      <td>{city}</td>
      <td>{state}</td>
      <td>{zip}</td>
      <td>{role}</td>
      <td className="gap__actions">

        <span className="badge  rounded-pill bg-info"
          style={{ width: '100px', display: 'inline-block', textAlign: 'center' }}
        >
          <Link to={`/${Id}`} className="text-white">
            <i className="fas fa-edit"></i>


          </Link>
        </span>
        <br />
        <span className="badge rounded-pill bg-danger" onClick={() => OnDelete(Id)}
          style={{ width: '100px', display: 'inline-block', textAlign: 'center' }}
        >
          <i className="fas fa-trash-alt"></i>
        </span>

      </td>
    </tr>
  );
};

export default RowDetails;
