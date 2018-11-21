import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import { authorsFormattedForDropdown } from '../../selectors/selectors';
import toastr from 'toastr';

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, props.course),
      errors: {},
      saving: false,
      dirty: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, () => {
      if (this.state.dirty)
        return 'Are you sure you want to leave without saving?';
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id !== nextProps.course.id) {
      //Necessary to populate form when existing course is loaded directly
      this.setState({ course: Object.assign({}, nextProps.course) });
    }
  }

  updateCourseState(event) {
    this.setState({ dirty: true });
    const field = event.target.name;
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;
    return this.setState({ course: course });
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    if (this.state.course.authorId.length === 0) {
      errors.authorId = 'Must select an author.';
      formIsValid = false;
    }

    if (this.state.course.category.length === 0) {
      errors.category = 'Category must not be empty.';
      formIsValid = false;
    }

    if (this.state.course.length.length === 0) {
      errors.length = 'Length must not be empty.';
      formIsValid = false;
    }

    this.setState({ errors });
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();

    if (!this.courseFormIsValid()) {
      return;
    }

    this.setState({ saving: true });
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch((error) => {
        toastr.error(error);
        this.setState({ saving: false });
      });
  }

  redirect() {
    this.setState({ saving: false, dirty: false });
    toastr.success('Course saved');
    this.props.router.push('/courses');
  }

  render() {
    return (
      <div>
        <CourseForm
          allAuthors={this.props.authors}
          course={this.state.course}
          errors={this.state.errors}
          onSave={this.saveCourse}
          onChange={this.updateCourseState}
          saving={this.state.saving}
        />
      </div>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  router: PropTypes.object,
  route: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id === id);
  if (course.length) return course[0]; //since filter returns an array , have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  let courseId = ownProps.params.id; //from the path /course/:id

  let course = { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' };

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  return {
    course,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage));
