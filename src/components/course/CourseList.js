import React, { PropTypes } from 'react';
import CourseListRow from './CourseListRow';

class CourseList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      displayedCourses: [...this.props.courses].splice(0, 7),
      index: 7
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(event) {
    let infiniteTable = event.target;
    let index =  this.state.index;
    if (index < this.props.courses.length
      && infiniteTable.scrollTop + infiniteTable.clientHeight >= infiniteTable.scrollHeight) {
      index++;
      this.setState({
        displayedCourses: [...this.props.courses].splice(0, index),
        index
      });
    }
  }

  render() {
    let { onDelete, deleting } = this.props;

    return (
    <div className="infiniteTable" onScroll={this.handleScroll}>
      <table className="table">
        <thead>
        <tr>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>Length</th>
        </tr>
        </thead>
        <tbody>
        {this.state.displayedCourses.map(course =>
          <CourseListRow key={course.id} course={course} onDelete={onDelete} deleting={deleting}/>
        )}
        </tbody>
      </table>
    </div>
    );
  }
}

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  deleting: PropTypes.bool
};

export default CourseList;
