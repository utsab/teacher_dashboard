const LOAD_SOLUTION = 'redux-example/solution/LOAD_SOLUTION';
const LOAD_SOLUTION_SUCCESS = 'redux-example/solution/LOAD_SOLUTION_SUCCESS';
const LOAD_SOLUTION_FAIL = 'redux-example/solution/LOAD_SOLUTION_FAIL';
const LOAD_CHALLENGES = 'redux-example/solution/LOAD_CHALLENGES';
const LOAD_CHALLENGES_SUCCESS = 'redux-example/solution/LOAD_CHALLENGES_SUCCESS';
const LOAD_CHALLENGES_FAIL = 'redux-example/solution/LOAD_CHALLENGES_FAIL';

const initialState = {
  loaded: false
};

export default function solution(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SOLUTION:
      return {
        ...state,
        loading: true
      };
    case LOAD_SOLUTION_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_SOLUTION_FAIL:
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
  return {
    types: [LOAD_SOLUTION, LOAD_SOLUTION_SUCCESS, LOAD_SOLUTION_FAIL],
    promise: (client) => client.get('/loadChallenge?url=' + url)
  };
}

export function loadChallengesList() {
  return {
    types: [LOAD_CHALLENGES, LOAD_CHALLENGES_SUCCESS, LOAD_CHALLENGES_FAIL],
    promise: (client) => client.get('/loadChallengesList')
  };
}
