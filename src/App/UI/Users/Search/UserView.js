/* @flow */

export default class UserView {
    id: string;
    email: string;
    firstname: string;
    lastname: string;

    constructor(id: string, email: string, firstname: string, lastname: string) {
        this.id = id;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;

        Object.freeze(this);
    }
}
