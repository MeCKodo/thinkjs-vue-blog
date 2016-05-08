'use strict';

import Base from './base.js';

export default class extends think.controller.base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){ // 登录按钮
    let username = this.post('username');
    let pwd = this.post('pwd');

    var userInfo = await this.model('user').where({username : username,pwd:pwd}).find();

    if(think.isEmpty(userInfo)) {
      return this.json({
        errcode : -1001,
        msg : "账号或密码错误"
      })
    }

    this.session('userInfo',userInfo);
    return this.json({
      errcode : 0,
      msg : "ok",
      userInfo : userInfo
    })
  }
  async statusAction() { // router.before 每次的判断
    let userInfo = await this.session('userInfo');
    console.log(userInfo);
    if(userInfo) {
      return this.json({
        errcode : 0,
        msg : '登录成功'
      })
    } else {
      return this.json({
        errcode : -1,
        msg : '没有权限'
      })
    }

  }
}