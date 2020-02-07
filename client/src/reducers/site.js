import { actionTypes } from '../actions/site';

const initialState = {
  isFetchingSites: false,
  sites: [],
  selectedSite: null,
  isFetching: false,
  site: {},
  changeFlag: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    // 获取站点
    case actionTypes.FETCH_SITE_PENDING: {
      return {
        ...state,
        isFetching: true,
        errorMessage: undefined,
      };
    }
    case actionTypes.FETCH_SITE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        site: action.payload.data,
        errorMessage: null,
      };
    }

    // 保存站点
    case actionTypes.SAVE_SITE_PENDING: {
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };
    }
    case actionTypes.SAVE_SITE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        site: action.payload.data,
        errorMessage: null,
      };
    }
    case actionTypes.SAVE_SITE_ERROR: {
      return {
        ...state,
        isFetchingSites: false,
        errorMessage: action.payload,
      };
    }

    // 删除站点
    case actionTypes.DEL_SITE_PENDING: {
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };
    }
    case actionTypes.DEL_SITE_SUCCESS: {
      const { uuid } = action.payload.data;
      const sites = state.sites.filter(site => site.uuid !== uuid);
      const selectedSite = uuid === state.selectedSite.uuid ? sites[0] : state.selectedSite;
      return {
        ...state,
        isFetching: false,
        sites,
        selectedSite,
      };
    }

    // 站点列表
    case actionTypes.FETCH_SITES_PENDING: {
      return {
        ...state,
        isFetchingSites: true,
      };
    }
    case actionTypes.FETCH_SITES_SUCCESS: {
      const sites = action.payload.data;
      const _selected = state.selectedSite;
      const matchedSite = _selected && sites.filter(s => s.uuid === _selected.uuid)[0];
      const selectedSite = matchedSite || sites[0];
      return {
        ...state,
        sites,
        selectedSite,
        isFetchingSites: false,
      };
    }

    // 选择站点
    case actionTypes.SELECT_SITE: {
      return {
        ...state,
        selectedSite: action.site,
      };
    }

    default: {
      return state;
    }
  }
}
