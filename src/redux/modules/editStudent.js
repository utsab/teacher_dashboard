const SAVE = 'redux-example/edit/SAVE';
const SAVE_SUCCESS = 'redux-example/edit/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/edit/SAVE_FAIL';
const EDIT_STUDENT = 'redux-example/edit/EDIT_STUDENT';
const SHOW_EDIT_MODAL = 'redux-example/edit/SHOW_EDIT_MODAL';
const LOAD = 'redux-example/edit/LOAD';
const LOAD_SUCCESS = 'redux-example/edit/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/edit/LOAD_FAIL';

const initialState = {
  loaded: false,
  studentList: []
};

export default function editStudent(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      console.log(action.result);
      console.log('68768687');
      return {
        ...state,
        loading: false,
        loaded: true,
        studentList: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case SAVE:
      console.log('CASE SAVE!!!***************');
      return {
        ...state,
        loading: true
      };
    case SAVE_SUCCESS:
      console.log(action.result);
      console.log('action result studentList');
      return {
        ...state,
        loading: false,
        loaded: false,
        studentList: action.result
      };
    case SAVE_FAIL:
      console.log('CASE SAVE FAIL!!!***************');
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case EDIT_STUDENT:
      console.log('in edit student');
      console.log(action.id);
      return {
        ...state,
        studentId: action.id
      };
    case SHOW_EDIT_MODAL:
      return {
        ...state,
        showModal: action.showModalBool
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.editStudent && globalState.editStudent.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadClass')
  };
}

export function editAStudent(email, github, firstname, lastname, notes, id) {
  console.log('EDIT STUDENTS!!!***************');
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/editClassForm', {
      data: {
        email: email,
        github: github,
        firstname: firstname,
        lastname: lastname,
        notes: notes,
        id: id
      }
    })
  };
}

export function isEditClicked(id) {
  return { type: EDIT_STUDENT, id };
}

export function showModalFuncEdit(showModalBool) {
  return { type: SHOW_EDIT_MODAL, showModalBool };
}

