import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserGateway } from "../models/User/gateway/user-gateway";
import { User } from "../models/User/user";

@Injectable ({
    providedIn : 'root'
})
export class UserUseCases {
    constructor( private _userGateway : UserGateway) {}
    getByID(id:String) :Observable<User> {
        return this._userGateway.getByID(id);
    }
}