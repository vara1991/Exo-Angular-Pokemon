import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { POKEMONS } from '../data/mock-pokemon';
import { Pokemon } from '../model/pokemon';
import { PokemonService } from '../service/pokemon.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styles: [
  ]
})
export class DetailPokemonComponent implements OnInit {

  pokemonList !: Pokemon[];
  pokemon !: Pokemon | undefined;

  //pour pouvoir récuper notre paramètre on doit utiliser un service
  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private service : PokemonService
  ) { }

  ngOnInit(){
    //snapshot : obtenir un tableau de param (paramMap)  à l'instant t
    const pokemonId : string|null = this.route.snapshot.paramMap.get('id');

    if(pokemonId){
      //this.pokemon = this.service.getPokemonById(+pokemonId);
      this.service.getPokemonById(+pokemonId)
        .subscribe(pokemon => this.pokemon = pokemon)
    }
  }

  deletePokemon(pokemon : Pokemon){
    this.service.deletePokemonById(pokemon.id)
      .subscribe(()=> this.router.navigateByUrl('pokemons'))
  }

  goToPokemonList(){
    return this.router.navigateByUrl('pokemons')
  }

  goToEditPokemon(pokemon : Pokemon){
    return this.router.navigateByUrl(`edit/pokemon/${pokemon.id}`)
  }
}
