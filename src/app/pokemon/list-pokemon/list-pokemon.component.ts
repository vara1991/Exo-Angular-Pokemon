import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../model/pokemon';
import { Router } from '@angular/router';
import { PokemonService } from '../service/pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styles: [
  ]
})
export class ListPokemonComponent implements OnInit {

  pokemonList !: Pokemon[];
  //pokemonSelected !: Pokemon|undefined;

  constructor(
    private router : Router,
    private service : PokemonService
  ) {}

  ngOnInit(): void {
    //console.table(this.pokemonList);
    //this.pokemonList = this.service.getPokemonList()
    //subscribe nous permet à nous abonner à un flux de donnée
    this.service.getPokemonList()
      .subscribe(pokemonList => this.pokemonList = pokemonList)
  }

  /*selectPokemon(pokemonId : String){
    const pokemon : Pokemon|undefined = this.pokemonList.find(pokemon => pokemon.id === +pokemonId)
    if(pokemon){
      this.pokemonSelected = pokemon;
    }else{
      this.pokemonSelected = undefined;
    }
  }*/

  goToPokemon(id:number){
    return this.router.navigateByUrl(`pokemons/${id}`)
  }

}
