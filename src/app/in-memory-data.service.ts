import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api'
import { POKEMONS } from './pokemon/data/mock-pokemon';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb(){
      //return pokemon dans la const sinon nous aurons une error 404
      const pokemons = POKEMONS
      return {pokemons}
  }
}

            
