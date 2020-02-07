import api from '../api';
// import { getCookie } from '../utils/';

export const actionTypes = {
  SELECT_SITE: 'SELECT_SITE',

  FETCH_SITE: 'FETCH_SITE',
  FETCH_SITE_PENDING: 'FETCH_SITE_PENDING',
  FETCH_SITE_SUCCESS: 'FETCH_SITE_SUCCESS',
  FETCH_SITE_ERROR: 'FETCH_SITE_ERROR',

  SAVE_SITE: 'SAVE_SITE',
  SAVE_SITE_PENDING: 'SAVE_SITE_PENDING',
  SAVE_SITE_SUCCESS: 'SAVE_SITE_SUCCESS',
  SAVE_SITE_ERROR: 'SAVE_SITE_ERROR',

  DEL_SITE: 'DEL_SITE',
  DEL_SITE_PENDING: 'DEL_SITE_PENDING',
  DEL_SITE_SUCCESS: 'DEL_SITE_SUCCESS',
  DEL_SITE_ERROR: 'DEL_SITE_ERROR',

  FETCH_SITES: 'FETCH_SITES',
  FETCH_SITES_PENDING: 'FETCH_SITES_PENDING',
  FETCH_SITES_SUCCESS: 'FETCH_SITES_SUCCESS',
  FETCH_SITES_ERROR: 'FETCH_SITES_ERROR',

  UPDATE_SITE_FORM: 'UPDATE_SITE_FORM',
};

export const fetchSite = id => ({
  type: actionTypes.FETCH_SITE,
  payload: {
    promise: api.get(`/api2/site/${id}`),
  },
});

const _fetchSites = () => ({
  type: actionTypes.FETCH_SITES,
  payload: {
    promise: api.get('/api2/site', {
      params: {
        populate: 'admins',
      },
    })
  },
});

export const fetchSites = () => (dispatch, getState) => {
  const state = getState();
  if (!state.site.isFetchingSites) {
    dispatch(_fetchSites());
  }
};

const _selectSite = site => ({
  type: actionTypes.SELECT_SITE,
  site,
});

export const selectSite = site => (dispatch) => {
  dispatch(_selectSite(site));
};

const _saveSite = (data, id) => ({
  type: actionTypes.SAVE_SITE,
  payload: {
    promise: api.post(id ? `/api2/site/${id}` : '/api2/site', { data }),
  },
});

export const saveSite = (data, id) => dispatch => dispatch(
  _saveSite(data, id)
).then(() => {
  dispatch(fetchSites());
});

const _deleteSite = (site) => ({
  type: actionTypes.DEL_SITE,
  payload: {
    promise: api.del(`/api2/site/${site.id}`),
  },
});

export const deleteSite = (site) => (dispatch, getState) => dispatch(
  _deleteSite(site)
).then(() => {
  const { selectedSite, sites } = getState().site;
  if (site.uuid === selectedSite.uuid) {
    dispatch(selectSite(sites[0]));
  }
});
