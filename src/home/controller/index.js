'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        //auto render template file index_index.html
        var article = await this.model('article').field({_id : 0}).select();
        console.log(article)
        this.assign({article : JSON.stringify(article)});
        return this.display();
    }
}