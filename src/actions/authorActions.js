import * as types from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';
import { beginAjaxCall } from './ajaxStatusActions';

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function saveAuthorSuccess(author) {
  return { type: types.SAVE_AUTHOR_SUCCESS, author };
}

export function updateAuthorSuccess(author) {
  return { type: types.UPDATE_AUTHOR_SUCCESS, author };
}

export function deleteAuthorSuccess(authorId) {
  return { type: types.DELETE_AUTHOR_SUCCESS, authorId };
}

export function loadAuthors() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return AuthorApi.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch(error => {
      throw (error);
    });
  };
}

export function saveAuthor(author) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return AuthorApi.saveAuthor(author)
      .then(savedAuthor => {
        author.id ? dispatch(updateAuthorSuccess(savedAuthor)) :
          dispatch(saveAuthorSuccess(savedAuthor));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function deleteAuthor(authorId) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return AuthorApi.deleteAuthor(authorId)
      .then(() => {
        dispatch(deleteAuthorSuccess(authorId));
      })
      .catch(error => {
        throw error;
      });
  };
}
