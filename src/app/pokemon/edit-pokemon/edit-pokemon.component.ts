import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Pokemon } from '../model/pokemon';
import { PokemonService } from '../service/pokemon.service';

@Component({
  selector: 'app-edit-pokemon',
  //[pokemon]="pokemon" -> passe pokemon dans input pokemon du component form
  template: `
   <h2 class="center">Editer {{pokemon?.name}}</h2>
   <p *ngIf = "pokemon" class="center">
    <img [src]="pokemon.picture"/>
   </p>
   <app-pokemon-form *ngIf="pokemon" [pokemon]="pokemon"></app-pokemon-form> 
  `,
  styles: [
  ]
})
export class EditPokemonComponent implements OnInit {

  pokemon !: Pokemon | undefined;

  constructor(
    private service : PokemonService,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    const pokemonId : string | null = this.route.snapshot.paramMap.get('id')
    if(pokemonId){
      //this.pokemon = this.service.getPokemonById(+pokemonId);
      this.service.getPokemonById(+pokemonId)
        .subscribe(pokemon => this.pokemon = pokemon)
    }else{
      this.pokemon = undefined;
    }
  }

}
