import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import { browserHistory } from 'react-router';
import toastr from 'toastr';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      courses: Object.assign({}, this.props.courses),
      deleting: false
    };

    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  deleteCourse(courseId) {
    if (confirm('Are you sure you want to delete this course?')){
      this.setState({ deleting: true });
      this.props.actions.deleteCourse(courseId)
        .then(() => {
          this.setState({ deleting: false });
          toastr.success('Course deleted.');
        })
        .catch(error => this.setState({ deleting: false }));
    }
  }

  render() {
    const { courses } = this.props;
    return (
      <div>
        <h1>Courses</h1>
        <input type="submit"
               value="Add Course"
               className="btn btn-primary"
               onClick={this.redirectToAddCoursePage}
               disabled={this.state.deleting}/>

        <br/>
        <br/>

        {courses.length > 0 ?
          <CourseList courses={courses} onDelete={this.deleteCourse} deleting={this.state.deleting}/>
          :
          this.props.loading ? <div/> : <h2><p>There are no courses to display</p></h2>
        }
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool
};

function mapStateToProps(state, ownProps) {
  let sortedCourses = [...state.courses].sort((courseA, courseB) => {
    return courseA.title < courseB.title ? -1 : 0;
  });

  return {
    courses: sortedCourses,
    loading: state.ajaxCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
