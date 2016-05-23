'use strict';

import Base from './base.js';
import marked from 'marked';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
  }
  addAction() {
    let content = this.post('content');
    let title = this.post('title');
    let bg = this.post('bg');
    let article = this.model('article').addArticle(title,content,bg);
    return this.success(0);
  }
  async listAction() {//文章列表

    let arts = await this.model('article').findArticle();
    arts.map(x => {
      x.content = encodeURIComponent(marked(decodeURIComponent(x.content)));
    });
    return this.json({
      arts : arts
    })

  }
  async detailAction() { //文章详情

    let id = this.get('id');
    console.log(id);
    let detail = await this.model('article').where({_id:id}).find();
    if(think.isArray(detail.badges)) {
      detail.badges = JSON.parse(detail.badges);
    }
    return this.json(detail);
  }
  async updateAction() { //更新文章
    let content = this.post('content');
    let title = this.post('title');
    console.log(title);
    let id = this.post('id');
    let detail = await this.model('article').where({_id:id}).update({content:content,title:title});
    return this.json({errcode:0,errmsg:'ok'});
  }
  async deleteAction() { //删除文章
    let id = this.post('id');
    let detail = await this.model('article').where({_id:id}).delete();
    return this.json({errcode:0,errmsg:'ok'});
  }


}