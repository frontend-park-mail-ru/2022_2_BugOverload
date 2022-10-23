import template from '@components/ReviewStatistic/reviewStatistic.handlebars';

export class ReviewStatistic {
    constructor(data) {
        this.data = data;
    }

    getTemplate() {
        return template(this.data);
    }
}
