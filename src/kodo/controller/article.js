'use strict';

import Base from './base.js';

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
  async listAction() {

    let arts = await this.model('article').findArticle();
    return this.json({
      arts : arts
    })

  }
}