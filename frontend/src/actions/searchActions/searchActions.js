import Axios from "axios";

import { searchConst } from "../../constants";

export function getUserMatches(username) {
    return dispatch => {
        dispatch({ type: searchConst.GET_USER_REQUEST });

        Axios.get(`http://localhost:4000/api/auth/findUserMatch/${username}`)
            .then(res => {
                const { usersList, reqTime } = res.data;
                dispatch({
                    type: searchConst.GET_USER_SUCCESS,
                    payload: {
                        usersList: usersList,
                        reqTime: reqTime
                    }
                });
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: searchConst.GET_USER_FAILURE
                });
            });
    };
}

export function getCompetitionMatches(competitionName) {
    return dispatch => {
        dispatch({ type: searchConst.GET_USER_REQUEST });

        Axios.get(
            `http://localhost:4000/api/competition/findCompetitionMatch/${competitionName}`
        )
            .then(res => {
                const { competitionsList, reqTime } = res.data;
                dispatch({
                    type: searchConst.GET_COMPETITIONS_SUCCESS,
                    payload: {
                        competitionsList: competitionsList,
                        reqTime: reqTime
                    }
                });
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: searchConst.GET_COMPETITIONS_FAILURE
                });
            });
    };
}

export function getOrganisationMatches(organisationName) {
    return dispatch => {
        dispatch({ type: searchConst.GET_ORGANISATION_REQUEST });

        Axios.get(
            `http://localhost:4000/api/organization/findOrganizationMatch/${organisationName}`
        )
            .then(res => {
                const { organisationsList, reqTime } = res.data;
                dispatch({
                    type: searchConst.GET_ORGANISATION_SUCCESS,
                    payload: {
                        organisationsList: organisationsList,
                        reqTime: reqTime
                    }
                });
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: searchConst.GET_ORGANISATION_FAILURE
                });
            });
    };
}
