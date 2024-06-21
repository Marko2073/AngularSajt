import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isUserLoggedIn:boolean= false;
  constructor() { }



  public IsUserLoggedIn():boolean{
    if(localStorage.getItem('token')){
      this.isUserLoggedIn = true;
    }
    return this.isUserLoggedIn;
  }
}
