/* @flow */

export default class FilterUsers {
    filter: string;
    maxResults: number;

    constructor(filter: string, maxResults: number) {
        this.filter = filter;
        this.maxResults = maxResults;

        Object.freeze(this);
    }
}
