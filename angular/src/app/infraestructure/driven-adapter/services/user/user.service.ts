import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserGateway } from 'src/app/domain/models/User/gateway/user-gateway';
import { User } from 'src/app/domain/models/User/user';
import { GenericService } from 'src/app/infraestructure/helpers/generic.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends UserGateway {
  private _url = 'https://62fe670241165d66bfbf550b.mockapi.io';
  constructor(private genericService: GenericService) {super(); }

  getByID(id: string): Observable<User> {
    return this.genericService.get<User>(this._url,'/baseline/users',id)
  }
}
