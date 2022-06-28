/* @flow */

import UserView from './UserView';

export default class UsersListView {
    pages: Map<number, ?Array<UserView>>;

    constructor(pages: Map<number, ?Array<UserView>>) {
        this.pages = pages;

        Object.freeze(this);
        Object.freeze(this.pages);
    }

    static createEmpty(pagesCount: number): UsersListView {
        const pages = new Map();

        for (let i = 1; i <= pagesCount; i++) {
            pages.set(i, undefined);
        }

        return new UsersListView(pages);
    }

    setUserPage(pageIndex: number, users: Array<UserView>) {
        if (!this.hasPage(pageIndex)) {
            return this;
        }

        const pages = new Map(this.pages.entries());
        pages.set(pageIndex, users);

        return new UsersListView(pages);
    }

    getUsers(pageIndex: number): Array<UserView> {
        return this.pages.get(pageIndex) || [];
    }

    isPageLoaded(pageIndex: number): boolean {
        return !!this.pages.get(pageIndex);
    }

    hasPage(pageIndex: number) {
        return this.pages.has(pageIndex);
    }

    hasPreviousPage(pageIndex: number) {
        return this.hasPage(pageIndex - 1);
    }

    hasNextPage(pageIndex: number) {
        return this.hasPage(pageIndex + 1);
    }

    getTotalPages(): number {
        return this.pages.size;
    }
}
