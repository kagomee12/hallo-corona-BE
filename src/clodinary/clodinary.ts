import { ConfigOptions, v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: async (): Promise<ConfigOptions> => {
    return v2.config({
      cloud_name: 'dq1pow2vn',
      api_key: '689143241971689',
      api_secret: 'LE0kaik5vaBlg_V6wSLE_hGltb0',
    });
  },
};