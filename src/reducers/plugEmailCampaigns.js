import {
  GET_EMAIL_CAMPAIGNS_FAIL,
  GET_EMAIL_CAMPAIGNS_SUCCESS,
  GET_EMAIL_CAMPAIGNS_REQUEST,
  CREATE_EMAIL_CAMPAIGN_FAIL,
  CREATE_EMAIL_CAMPAIGN_REQUEST,
  CREATE_EMAIL_CAMPAIGN_SUCCESS,
} from '../constants/emailCampaignConstants';

export const getEmailCampignsReducer = (
  state = { emailCampaigns: [] },
  action
) => {
  switch (action.type) {
    case GET_EMAIL_CAMPAIGNS_REQUEST:
      return {
        loading: true,
      };
    case GET_EMAIL_CAMPAIGNS_SUCCESS:
      return { ...state, loading: false, emailCampaigns: action.payload };
    case GET_EMAIL_CAMPAIGNS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createEmailCampaignReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_EMAIL_CAMPAIGN_REQUEST:
      return { loading: true };
    case CREATE_EMAIL_CAMPAIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        emailCampaign: action.payload,
      };
    case CREATE_EMAIL_CAMPAIGN_FAIL:
      return { loading: false, error: action.payload };
 
    default:
      return state;
  }
};
