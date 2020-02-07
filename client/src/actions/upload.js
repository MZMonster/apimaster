/**
 * Copyright (c) 2016 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author Chester
 * @date  16/7/7
 * @description
 *
 */

import api from '../api';

export const FETCH_UPLOAD_PARAMS = 'FETCH_UPLOAD_PARAMS';
export const FETCH_UPLOAD_PARAMS_SUCCESS = 'FETCH_UPLOAD_PARAMS_SUCCESS';

export const fetchUploadParams = () => ({
  type: FETCH_UPLOAD_PARAMS,
  payload: {
    promise: api.get('/api2/upload/params'),
  },
});
