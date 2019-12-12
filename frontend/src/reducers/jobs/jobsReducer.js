import { jobsConstants } from "../../constants/index";

const initialState = {
    filteredJobs: [],
    currentJob: null,
    postJobOffer: null,
    postJobAvailable: null,
    message: null,
    isLoading: true
};

export default function(state = initialState, action) {
    switch (action.type) {
        case jobsConstants.APPLY_JOB_REQUEST:
            return {
                ...state,
                message: null,
                isLoading: true
            };
        case jobsConstants.APPLY_JOB_SUCCESS:
        case jobsConstants.APPLY_JOB_FAILURE:
            return {
                ...state,
                message: action.message,
                isLoading: false
            };
        case jobsConstants.POST_JOB_OFFER_REQUEST:
            return {
                ...state,
                postJobOffer: action.job,
                isLoading: true
            };
        case jobsConstants.POST_JOB_AVAILABLE_REQUEST:
            return {
                ...state,
                postJobAvailable: action.job,
                isLoading: true
            };
        case jobsConstants.POST_JOB_AVAILABLE_FAILURE:
        case jobsConstants.POST_JOB_AVAILABLE_SUCCESS:
            return {
                ...state,
                postJobAvailable: null,
                isLoading: false
            };
        case jobsConstants.POST_JOB_OFFER_SUCCESS:
        case jobsConstants.POST_JOB_OFFER_FAILURE:
            return {
                ...state,
                postJobOffer: null,
                isLoading: false
            };
        case jobsConstants.GET_FILTERED_JOBS_REQUEST:
            return {
                ...state,
                filteredJobs: [],
                isLoading: true
            };
        case jobsConstants.GET_FILTERED_JOBS_SUCCESS:
            return {
                ...state,
                filteredJobs: action.filteredJobs,
                isLoading: false
            };
        case jobsConstants.GET_FILTERED_JOBS_FAILURE:
            return {
                ...state,
                filteredJobs: [],
                isLoading: false
            };
        case jobsConstants.GET_JOB_REQUEST:
            return {
                ...state,
                currentJob: null,
                isLoading: true
            };
        case jobsConstants.GET_JOB_SUCCESS:
            return {
                ...state,
                currentJob: action.job,
                isLoading: false
            };
        case jobsConstants.GET_JOB_FAILURE:
            return {
                ...state,
                currentJob: [],
                isLoading: false
            };
        default:
            return { ...state };
    }
}
