import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../model/pokemon';
import { PokemonService } from '../service/pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls : ['./pokemon-form.component.css' ]
})
export class PokemonFormComponent implements OnInit {

  //Quand on utilse ce composant (app-pokemon-form) on doit avoir une propriété pokemon
  @Input() pokemon !: Pokemon; 
  types !: string[];
  isAddForm !: boolean;

  constructor(
    private service : PokemonService,
    private router : Router
  ) { }

  ngOnInit() {
    this.types = this.service.getPokemonType(),
    //si on trouve add dans l'url isAddForm = true
    this.isAddForm = this.router.url.includes('add')
  }

  //Le pohémon x à le type ... ?
  hasType(type : string) : boolean{
    return this.pokemon.types.includes(type) ? true : false
  }

  //on veut savoir avec event si on a coché ou décoché un checkbox
  selectType($event : Event, type : string){
    //notre checkbox est coché ?
    //il faut faire un cast
    const isCheked : boolean = ($event.target as HTMLInputElement).checked;

    if (isCheked){
      //ajoute le type dans le tableau
      this.pokemon.types.push(type)
    }else{
      //on veut récupéré l'index qu pokemon qu'on veut retirer
      const index = this.pokemon.types.indexOf(type);
      //on retire le type avec l'index ...
      this.pokemon.types.splice(index, 1)
    }
  }

  isTypesValid(type: string) : boolean{
    //si le pokemon a 1 seule type et je travaille sur le type courant
    if(this.pokemon.types.length == 1 && this.hasType(type)){
      //désactive la checkbox (on ne peut plus décocher notre type)
      return false
    }

    //si le nbre de type est > 2 (au moins 3) et qu'on n'est pas sur le type courant
    if(this.pokemon.types.length > 2 && !this.hasType(type)){
      //désactive la checbox (on ne peut plus coché des cases supplémentaires)
      return false
    }

    return true;
  } 

  onSubmit(){

    //Si nous ajoutons un pokemon on fait ... sinon ...
    if(this.isAddForm){
      //c'est l'api qui ajoute l'id
      this.service.addPokemon(this.pokemon)
      .subscribe((pokemon : Pokemon) => this.router.navigate(['/pokemons', pokemon.id]))
    }else{
      this.service.updatePokemon(this.pokemon)
      .subscribe(() => this.router.navigate(['/pokemons', this.pokemon.id]))
    }
  }

}
