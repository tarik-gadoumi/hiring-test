/* @flow */

export default class FetchUsers {
    page: number;
    perPage: number;

    constructor(page: number, perPage: number) {
        this.page = page;
        this.perPage = perPage;

        Object.freeze(this);
    }
}
