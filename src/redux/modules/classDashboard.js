const SAVE = 'redux-example/classDashboard/SAVE';
const SAVE_SUCCESS = 'redux-example/classDashboard/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/classDashboard/SAVE_FAIL';
const LOAD = 'redux-example/classDashboard/LOAD';
const LOAD_SUCCESS = 'redux-example/classDashboard/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/classDashboard/LOAD_FAIL';

const initialState = {
  loaded: false,
  studentList: []
};

export default function classDashboard(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      console.log('load success for studnets');
      console.log(action.result);
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
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  console.log(globalState.classForm && globalState.classForm.loaded);
  return globalState.classForm && globalState.classForm.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadClass')
  };
}
