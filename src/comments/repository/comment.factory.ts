import {Inject, Injectable, Scope} from "@nestjs/common";
import {REQUEST} from "@nestjs/core";
import {CommentPostgresImpl} from "./commentPostgresImpl";
import {CommentMockrepo} from "./comment.mockrepo";
import {request} from "express";

@Injectable({scope: Scope.REQUEST})
export class CommentFactory {
    private headers;

    constructor(
        @Inject(REQUEST) private request: Request,
        private postgres: CommentPostgresImpl,
        private mock: CommentMockrepo,
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
        console.log(headers)
        return headers['x-testing-enabled'] == 'True' ? true : false;
    }
}