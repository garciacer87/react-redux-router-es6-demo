import React, { PropTypes } from 'react';
import TextInput from '../common/TextInput';

const AuthorForm = ({ author, onChange, onSave, errors, saving }) => {
  return (
    <form>
      <h1>Manage Author</h1>
      <TextInput
        name="firstName"
        label="First Name"
        value={author.firstName}
        onChange={onChange}
        error={errors.firstName}/>

      <TextInput
        name="lastName"
        label="Last Name"
        value={author.lastName}
        onChange={onChange}
        error={errors.lastName}/>

      <input
        type="submit"
        value={saving ? 'Saving...' : 'Save'}
        disabled={saving}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

AuthorForm.propTypes = {
  author: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  saving: PropTypes.bool
};

export default AuthorForm;
