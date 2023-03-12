import { Observable } from "rxjs";
import { User } from "../user";

export abstract class UserGateway {
    abstract getByID(id: String): Observable<User>;
}