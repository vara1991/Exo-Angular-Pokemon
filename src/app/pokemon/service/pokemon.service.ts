import { Injectable } from '@angular/core';
import { Pokemon } from '../model/pokemon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, of } from 'rxjs';

@Injectable()
export class PokemonService {

  constructor(private http : HttpClient) { }

  //avec requête http, on fait des requête asynchrone (on n'a pas les résultats à l'instant ts)
  getPokemonList() : Observable<Pokemon[]> {
    //return this.pokemonList;
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((response) => this.log(response)),
      //si nous avons une erreur plutôt que l'application bug on return un tableau vide
      //of permet convertir notre tableau en observable
      catchError((error) => this.handleError(error, []))  
    )
  }

  getPokemonById(id : number) : Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${id}`).pipe(
      tap((response) => this.log(response)),
      catchError((error)=> this.handleError(error, undefined))
    )
  }

  searchPokemonList(term:string) : Observable<Pokemon[]>{
    if(term.length<2){
      return of([]);
    }
    return this.http.get<Pokemon>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error)=>this.handleError(error, []))
    )
  }

  //Attention avec in memori quand update est un succée nous avons null au lieu de pokemon|undefined
  updatePokemon(pokemon : Pokemon) : Observable<null>{
    //dans un update on a besoin d'un header pour envoyer les infos du pokémon au serveur
    const httpOptions = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    };
    return this.http.put<Pokemon>('api/pokemons', pokemon , httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error)=>this.handleError(error, null))
    )
  }

  deletePokemonById(id : number) : Observable<null>{
    return this.http.delete<null>(`api/pokemons/${id}`).pipe(
      tap((response) => this.log(response)),
      catchError((error)=> this.handleError(error, undefined))
    )
  }

  addPokemon(pokemon : Pokemon) : Observable<Pokemon>{
    const httpOptions = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    }
    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error)=>this.handleError(error, null))
    )
  }

  private log (response : any){
    console.table(response)
  }

  private handleError(error : Error, errorValue : any){
    console.error(error);
    return of (errorValue)
  }

  getPokemonType() : string[]{
    return ['Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik', 'Poison', 'Fée', 'Vol', 'Combat', 'Psy']
  }
}
