/**
 * Copyright (c) 2016 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author Chester
 * @date  16/7/7
 * @description
 *
 */

export const upyun = {
  cdn: process.env.NODE_ENV === 'production' ? '//image.api-master.meizu.com' : '//sscc-test.b0.upaiyun.com',
  uploadUrl: process.env.NODE_ENV === 'production' ? 'https://v0.api.upyun.com/ss-cc' : 'https://v0.api.upyun.com/sscc-test',
  'ss-cc': {
    cdnPrefix: '//image.api-master.meizu.com',
    uploadUrl: 'https://v0.api.upyun.com/ss-cc',
  },
  'sscc-test': {
    cdnPrefix: '//sscc-test.b0.upaiyun.com',
    uploadUrl: 'https://v0.api.upyun.com/sscc-test',
  },
}
;
