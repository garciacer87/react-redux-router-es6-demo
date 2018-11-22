import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import AuthorList from './AuthorList';
import * as authorActions from '../../actions/authorActions';
import toastr from 'toastr';

class AuthorsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.deleteAuthor = this.deleteAuthor.bind(this);
  }

  redirectToAddCoursePage() {
    browserHistory.push('/author');
  }

  deleteAuthor(authorId) {
    let authorInCourse = this.props.courses.some(course => {
      return course.authorId === authorId;
    });

    if (authorInCourse) {
      alert('This author cannot be deleted because he has an associated course');
      return;
    }

    this.props.actions.deleteAuthor(authorId)
      .then(() => {
        toastr.success('Author deleted.');
      })
      .catch(error => {
        toastr.error(error);
      });
  }

  render() {
    let {authors, loading} = this.props;
    return (
      <div>
        <h1>Authors Page</h1>
        <input type="submit"
               value="Add Author"
               className="btn btn-primary"
               onClick={this.redirectToAddCoursePage}/>
        {authors.length > 0 ?
          <AuthorList authors={authors} onDelete={this.deleteAuthor}/>
        :
          loading ? <div/> : <h2><p>There are no authors to display</p></h2>
        }

      </div>
    );
  }
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool
};

function mapStateToProps(state, ownProps) {
  let sortedAuthors = [...state.authors].sort((authorA, authorB) => {
    return authorA.id < authorB.id ? -1 : 0;
  });

  return {
    authors: sortedAuthors,
    courses: state.courses,
    loading: state.ajaxCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
