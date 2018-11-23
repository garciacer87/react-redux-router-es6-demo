import React, { PropTypes } from 'react';
import AuthorListRow from './AuthorListRow';

class AuthorList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      authorsDisplayed: [...this.props.authors].splice(0, 7),
      index: 7
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(event) {
    let infiniteTable = event.target;
    let index = this.state.index;

    if (index < this.props.authors.length && infiniteTable.scrollTop + infiniteTable.clientHeight >= infiniteTable.scrollHeight) {
      index++;
      this.setState({
        authorsDisplayed: [...this.props.authors].splice(0, index),
        index
      });
    }
  }

  render() {
    let { onDelete } = this.props;

    return (
      <div className="infiniteTable" onScroll={this.handleScroll}>
        <table className="table">
          <thead>
          <tr>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>First name</th>
            <th>Last name</th>
          </tr>
          </thead>
          <tbody>
          {this.state.authorsDisplayed.map(author =>
            <AuthorListRow key={author.id} author={author} onDelete={onDelete}/>
          )}
          </tbody>
        </table>
      </div>
    );
  }
}

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default AuthorList;
