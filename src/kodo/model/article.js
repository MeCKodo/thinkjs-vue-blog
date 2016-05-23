'use strict';
/**
 * model
 */
import moment from 'moment';

export default class extends think.model.mongo {
    addArticle(title,content,badges) {
        this.add({
            title : title,
            content: encodeURIComponent(content),
            badges : badges,
            ctime: moment().format('YY年MM月DD日')
        });
    }


    findArticle() {
        return this.select();
    }
}