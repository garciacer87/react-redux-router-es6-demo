import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import * as authorActions from '../../actions/authorActions';
import AuthorForm from './AuthorForm';
import toastr from 'toastr';

class ManageAuthorPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      author: Object.assign({}, props.author),
      errors: {},
      saving: false,
      dirty: false
    };

    this.updateAuthorState = this.updateAuthorState.bind(this);
    this.saveAuthor = this.saveAuthor.bind(this);
  }

  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, () => {
      if (this.state.dirty)
        return 'Are you sure you want to leave without saving?';
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.author.id !== nextProps.author.id) {
      this.setState({ author: Object.assign({}, nextProps.author) });
    }
  }

  updateAuthorState(event) {
    this.setState({ dirty: true });
    const field = event.target.name;
    let author = Object.assign({}, this.state.author);
    author[field] = event.target.value;
    return this.setState({ author });
  }

  isFormValid() {
    let formValid = true;
    let errors = {};

    if (this.state.author.firstName.length === 0) {
      errors.firstName = 'First name must not be empty';
      formValid = false;
    }

    if (this.state.author.lastName.length === 0) {
      errors.lastName = 'Last name must not be empty';
      formValid = false;
    }

    this.setState({ errors });

    return formValid;
  }

  redirect() {
    this.setState({ saving: false, dirty: false });
    toastr.success('Author created.');
    this.props.router.push('/authors');
  }

  saveAuthor(event) {
    event.preventDefault();

    if (!this.isFormValid()) return;

    this.setState({ saving: true });

    this.props.actions.saveAuthor(this.state.author)
      .then(() => {
        this.redirect();
      })
      .catch(error => {
        this.setState({ saving: false });
        toastr.error(error);
      });
  }

  render() {
    let { author, errors, saving } = this.state;
    return (
      <AuthorForm
        author={author}
        onChange={this.updateAuthorState}
        onSave={this.saveAuthor}
        errors={errors}
        saving={saving}/>
    );
  }
}

ManageAuthorPage.propTypes = {
  author: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  router: PropTypes.object,
  route: PropTypes.object
};

function getAuthorById(authorId, authors) {
  let author = authors.filter(author => author.id === authorId);
  return author.length ? author[0] : null;
}

function mapStateToProps(state, ownProps) {
  let authorId = ownProps.params.id;
  let author = { id: '', firstName: '', lastName: '' };

  if (authorId && state.authors.length > 0) {
    author = getAuthorById(authorId, state.authors);
  }

  return {
    author
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage));
