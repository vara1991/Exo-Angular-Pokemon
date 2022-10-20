import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //l'utilisateur est-il connecté ?
  isLoggedIn : boolean =false ;
  redirectUrl !: string;

  login(name:string, password:string) : Observable<boolean>{
    //si mdp = pikachu et name = pikachu donc utilisateur connecté
    const isLoggedIn = (name == 'pikachu' && password == 'pikachu');

    return of(isLoggedIn).pipe(
      //pour simuler le délais de chargement on met un délais de 1s
      delay(1000),
      tap(isLoggedIn => this.isLoggedIn = isLoggedIn)
    )
  }

  logout(){
    this.isLoggedIn = false;
  }
}
