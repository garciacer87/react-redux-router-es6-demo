import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const AuthorListRow = ({ author, onDelete }) => {

  const handleDelete = (event) => {
    event.preventDefault();
    onDelete(author.id);
  };

  return (
    <tr>
      <td><a href="#" target="_blank" onClick={handleDelete}>Delete</a></td>
      <td><Link to={`/author/${author.id}`}>{author.id}</Link></td>
      <td>{author.firstName}</td>
      <td>{author.lastName}</td>
    </tr>
  );
};

AuthorListRow.propTypes = {
  author: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default AuthorListRow;
