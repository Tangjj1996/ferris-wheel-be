/**
 * 开发环境
 */
export const isDev = (() => {
  return process.env.NODE_ENV === 'development';
})();

/**
 * 生产环境
 */
export const isProd = (() => {
  return process.env.NODE_ENV === 'production';
})();
