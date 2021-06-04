import api from '../utils/api';
import { setAlert } from './alert';

import {
  CREATE_EMAIL_CAMPAIGN_REQUEST,
  CREATE_EMAIL_CAMPAIGN_FAIL,
  CREATE_EMAIL_CAMPAIGN_SUCCESS,
} from '../constants/emailCampaignConstants';

export const runCampaign = (formData, history) => async (dispatch) => {
  dispatch({
    type: CREATE_EMAIL_CAMPAIGN_REQUEST,
  });

  try {
    const res = await api.post(`/emailcampaigns`, formData);

    dispatch({
      type: CREATE_EMAIL_CAMPAIGN_SUCCESS,
      payload: res.data.data,
    });
    dispatch(setAlert('Campaign successfully sent to recipients', 'success'));
    history.push('/admin');
  } catch (err) {
    const errors = err.response.data.error;
    console.log(err.response.data.error);
    const errorArray = errors.split(',');

    if (errorArray) {
      errorArray.map((error) => dispatch(setAlert(error, 'success')));
    }

    dispatch({
      type: CREATE_EMAIL_CAMPAIGN_FAIL,
    });
  }
};
