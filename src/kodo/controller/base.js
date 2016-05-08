'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */

  async __before() {
    let userInfo = await this.session("userInfo");
    console.log(userInfo);
    //如果没有登录，则跳转到登录页面
    if(think.isEmpty(userInfo)) {
      if(this.isAjax()) {
        return this.json({
          errcode : -1,
          msg : "未登录"
        })
      } else {
        return this.display()
      }
    }
  }
}