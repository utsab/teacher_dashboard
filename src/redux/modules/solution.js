const LOAD = 'redux-example/solution/LOAD';
const LOAD_SUCCESS = 'redux-example/solution/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/solution/LOAD_FAIL';
const LOAD_CHALLENGES = 'redux-example/solution/LOAD_CHALLENGES';
const LOAD_CHALLENGES_SUCCESS = 'redux-example/solution/LOAD_CHALLENGES_SUCCESS';
const LOAD_CHALLENGES_FAIL = 'redux-example/solution/LOAD_CHALLENGES_FAIL';

const initialState = {
  loaded: false
};

export default function solution(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
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
    case LOAD_CHALLENGES:
      return {
        ...state,
        loading: true
      };
    case LOAD_CHALLENGES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        challengesList: action.result
      };
    case LOAD_CHALLENGES_FAIL:
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

export function isChallengesListLoaded(globalState) {
  return globalState.solution.challengesList && globalState.solution.loaded;
}

export function loadChallenge(url) {
  console.log('loadChallenge!!!!!!!!!@%%&^*^');
  console.log('/loadChallenge?url=' + url);
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadChallenge?url=' + url)
  };
}

export function loadChallengesList() {
  return {
    types: [LOAD_CHALLENGES, LOAD_CHALLENGES_SUCCESS, LOAD_CHALLENGES_FAIL],
    promise: (client) => client.get('/loadChallengesList')
  };
}
