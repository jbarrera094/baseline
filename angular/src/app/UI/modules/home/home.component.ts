import { Component, OnInit } from '@angular/core';
import { UserUseCases } from 'src/app/domain/usecase/userusecase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _userUseCase : UserUseCases) { }
response$: any ;
datos: any ;
  ngOnInit(): void {
    console.log('modulo home')
this.response$ = this._userUseCase.getByID('14');
this.response$.subscribe(
  (data: any) => {
    this.datos = data
  }
)
  }

}
