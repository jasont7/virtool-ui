import { connectRouter, routerMiddleware } from "connected-react-router";
import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import accountReducer from "../account/reducer";
import cachesReducer from "../caches/reducer";
import settingsReducer from "../administration/reducer";
import analysesReducer from "../analyses/reducer";
import errorsReducer from "../errors/reducer";
import filesReducer from "../files/reducer";
import groupsReducer from "../groups/reducer";
import hmmsReducer from "../hmm/reducer";
import indexesReducer from "../indexes/reducer";
import jobsReducer from "../jobs/reducer";
import otusReducer from "../otus/reducer";
import referencesReducer from "../references/reducer";
import samplesReducer from "../samples/reducer";
import labelsReducer from "../labels/reducer";
import subtractionReducer from "../subtraction/reducer";
import tasksReducer from "../tasks/reducer";
import usersReducer from "../users/reducer";
import { CREATE_FIRST_USER, LOGIN, LOGOUT, RESET_PASSWORD, SET_INITIAL_STATE } from "./actionTypes";
import rootSaga from "./sagas";

const initialState = {
    login: false,
    reset: false
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN.SUCCEEDED:
            if (action.data.reset) {
                return {
                    ...state,
                    login: false,
                    reset: true,
                    resetCode: action.data.reset_code
                };
            }

            return {
                ...state,
                login: false,
                reset: false
            };

        case LOGIN.FAILED:
            return {
                ...state,
                login: true
            };

        case LOGOUT.SUCCEEDED:
            return {
                ...state,
                login: true
            };

        case RESET_PASSWORD.SUCCEEDED:
            return {
                ...state,
                login: false,
                reset: false,
                resetCode: null,
                resetError: null
            };

        case RESET_PASSWORD.FAILED:
            return {
                ...state,
                login: false,
                reset: true,
                resetCode: action.data.reset_code,
                resetError: action.data.error
            };

        case CREATE_FIRST_USER.SUCCEEDED:
            return {
                ...state,
                login: false,
                first: false
            };

        case SET_INITIAL_STATE:
            return {
                ...state,
                dev: action.dev,
                first: action.first
            };
    }

    return state;
};

export const createAppStore = history => {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        combineReducers({
            account: accountReducer,
            analyses: analysesReducer,
            app: appReducer,
            caches: cachesReducer,
            errors: errorsReducer,
            files: filesReducer,
            groups: groupsReducer,
            hmms: hmmsReducer,
            indexes: indexesReducer,
            jobs: jobsReducer,
            labels: labelsReducer,
            otus: otusReducer,
            references: referencesReducer,
            router: connectRouter(history),
            samples: samplesReducer,
            settings: settingsReducer,
            subtraction: subtractionReducer,
            tasks: tasksReducer,
            users: usersReducer
        }),
        applyMiddleware(sagaMiddleware, routerMiddleware(history))
    );

    sagaMiddleware.run(rootSaga);

    return store;
};
