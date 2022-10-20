import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../service/pokemon.service';
import { Pokemon } from '../model/pokemon';
import { debounceTime, distinctUntilChanged, map, Observable, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styles: [
  ]
})
export class SearchPokemonComponent implements OnInit {

  //Classe Subject appartient à RxJs
  //classe qui nous permet de stocké les recherches successive de l'utilisateur
  //..."a"...."ab"..."abz"..."ab"..."abc" 
  searchTerms = new Subject<string>();
  
  //Dans notre liste on cherche .... : pokemonList(a)
  pokemons$ !: Observable<Pokemon[]>;

  constructor(
    private service:PokemonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      //devouceTime : élimine les recherches qui n'ont pas un certain temps d'attente 
      //l'utilisateur veut faire une recherche sur abc il ne sert à rien à demander au serveur de faire une recherche sur a puis b puis c
      //c'est pourquoi on va mettre un certian tps de latence => on élimine les requêtes inutile
      //..."a"."ab"..."abz"."ab"..."abc..." 
      debounceTime(300),
      //..."ab"..."ab"..."abc..." : 1 point = 1 miliseconde
      //elimine une requête identique à la requête précédente
      distinctUntilChanged(),
        //..."ab"......."abc..." : 1 point = 1 miliseconde
      switchMap((term) => this.service.searchPokemonList(term))
    )
  }

  search(term:string){
    this.searchTerms.next(term)
  }

  goToDetail(pokemon : Pokemon){
    const link = ['/pokemons', pokemon.id];
    this.router.navigate(link);
  }

}
