'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }
  articleAction() {
    let content = this.post('content');
    let title = this.post('title');
    let bg = this.post('bg');
    let article = this.model('article').addArticle(title,content,bg);
    return this.success(0);
  }
  articleListAction() {
    return this.json({
      msg : 'ok'
    })
  }

}