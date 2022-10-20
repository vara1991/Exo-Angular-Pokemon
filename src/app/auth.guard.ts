import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService : AuthService,
    private router : Router
  ){}

  canActivate() : boolean{
    //Quand c'est un bool on n'a besoin de mettre this.authService.isLoggedIn == true
    //Si l'utilisateur est connecté il est autorisé à accéder à la suite du projet
    if(this.authService.isLoggedIn){
      return true
    }

    this.router.navigate(['/login'])
    return false;
  }
  
}
