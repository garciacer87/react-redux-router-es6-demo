import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const CourseListRow = ({ course, onDelete, deleting }) => {

  const handleClickRow = (event) => {
    event.preventDefault();
    onDelete(course.id);
  };

  return (
    <tr>
      <td><a className={deleting ? 'disabled' : ''} href={course.watchHref} target="_blank">Watch</a></td>
      <td><a className={deleting ? 'disabled' : ''} href="#" target="_blank" onClick={handleClickRow}>Delete</a></td>
      <td><Link className={deleting ? 'disabled' : ''} to={'/course/' + course.id}>{course.title}</Link></td>
      <td>{course.authorId}</td>
      <td>{course.category}</td>
      <td>{course.length}</td>
    </tr>
  );
};

CourseListRow.propTypes = {
  course: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  deleting: PropTypes.bool
};

export default CourseListRow;
