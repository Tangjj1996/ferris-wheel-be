export enum BizHttpStatus {
  /**
   * 400 ~ 500 的报错
   */
  /**
   * 微信 查找不到 openId
   */
  wx_not_found_openid = 4001,
  /**
   * 用户未带上 openid
   */
  user_not_get_openid = 4002,
  /**
   * 转盘配置已存在
   */
  user_has_already_exist = 5001,
}
