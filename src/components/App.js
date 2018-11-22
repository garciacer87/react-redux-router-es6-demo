import React, { PropTypes } from 'react';
import Header from './common/Header';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header numberOfCourses={this.props.numberOfCourses} numberOfAuthors={this.props.numberOfAuthors} loading={this.props.loading}/>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  numberOfCourses: PropTypes.number,
  numberOfAuthors: PropTypes.number
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0,
    numberOfCourses: state.courses.length,
    numberOfAuthors: state.authors.length
  };
}

export default connect(mapStateToProps)(App);
