const LOAD = 'redux-example/user/LOAD';
const LOAD_SUCCESS = 'redux-example/user/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/user/LOAD_FAIL';
const SAVE = 'redux-example/user/SAVE';
const SAVE_SUCCESS = 'redux-example/user/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/user/SAVE_FAIL';

const initialState = {
  loaded: false
};

export default function users(state = initialState, action = {}) {
  console.log('In users reducer ^^^^^^^^^^^^^^^^^^^^^^^^^');
  console.log(action.type);

  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      console.log('user load success!!!***************');
      console.log(action.result);
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
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
      console.log('user SAVE_SUCCESS!!!***************');
      console.log(action.result);
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
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

export function load() {
  console.log('loading users **************');
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadUsers')
  };
}

export function addUser() {
  console.log('ADD USER!!!***************');
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/postUser')
    // promise: (client) => client.get('/loadUsers')
  };
}
