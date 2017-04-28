const SAVE = 'redux-example/student/SAVE';
const SAVE_SUCCESS = 'redux-example/student/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/student/SAVE_FAIL';

const initialState = {
  loaded: false
};

export default function users(state = initialState, action = {}) {
  switch (action.type) {
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
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.users && globalState.users.loaded;
}

export function addStudent(email, github, firstname, lastname, notes) {
  console.log('ADD STUDENTS!!!***************');
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/postClassForm', {
      data: {
        email: email,
        github: github,
        firstname: firstname,
        lastname: lastname,
        notes: notes
      }
    })
  };
}
