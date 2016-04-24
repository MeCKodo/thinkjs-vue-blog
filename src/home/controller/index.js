'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        //auto render template file index_index.html
        var article = await this.model('article').select();
        article.map( x => {
            x.badges = JSON.parse(x.badges);
        });
        this.assign({article : JSON.stringify(article)});
        return this.display();
    }
    async articleAction() {
        console.log('------------');
        var id = this.get('id');
        console.log(id);
        var detail = await this.model('article').where({_id:id}).find();
        console.log(detail);
        return this.json(detail);
    }


}