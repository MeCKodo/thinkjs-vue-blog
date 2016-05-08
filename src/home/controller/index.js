'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        let article = await this.model('article').select();
        // await this.session(); 测试清除登入session
        article.map( x => {
            x.badges = JSON.parse(x.badges);
        });
        this.assign({article : JSON.stringify(article)});
        return this.display();
    }
    
    async articleAction() {
        let id = this.get('id');
        let detail = await this.model('article').where({_id:id}).find();
            detail.badges = JSON.parse(detail.badges);
        return this.json(detail);
    }
    

}