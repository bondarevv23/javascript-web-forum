import {Inject, Injectable, Scope} from "@nestjs/common";
import {REQUEST} from "@nestjs/core";
import {UserPostgresrepo} from "./user.postgresrepo";
import {UserMockrepo} from "./user.mockrepo";

@Injectable({scope: Scope.REQUEST})
export class UserFactory {
    private headers;

    constructor(
        @Inject(REQUEST) private request: Request,
        private postgres: UserPostgresrepo,
        private mock: UserMockrepo,
    ) {
        this.headers = request.headers;
    }

    create() {
        const isTest = this.isTestHeader(this.headers);
        if (isTest) {
            console.log("mock repos")
            return this.mock;
        } else {
            console.log("postgres repos")
            return this.postgres
        }
    }

    private isTestHeader(headers): boolean {
        return headers['x-testing-enabled'] == 'True' ? true : false;
    }
}