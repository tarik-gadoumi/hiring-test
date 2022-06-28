/* @flow */

export default class UserView {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    picture: string;

    constructor(id: string, email: string, firstname: string, lastname: string, picture: string) {
        this.id = id;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.picture = picture;

        Object.freeze(this);
    }
}
