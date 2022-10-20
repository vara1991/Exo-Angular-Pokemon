import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]'
})
export class BorderCardDirective {

  private initialColor : string = '#f5f5f5'; //couleur de la bordure lorsque la souris n'est pas dessus
  private defaultColor : string = '#009688';
  private defaultHeight : number = 180;

  //ElmentRef : élément qui représente une référence vers l'élément du DOM qu'on va appliquer notre directive (ici card pokemeon)
  constructor(private el : ElementRef) {
    //lorsqu'on initialisera notre directive nous aurons ...
    this.setHeight(this.defaultHeight);
    this.setBorder(this.initialColor);

  } 

  @Input('pkmnBorderCard') borderColor !: string; //avec alias

  //lorsque la souris passe sur la card on change la bordure
  @HostListener('mouseenter') onMouseEnter(){
    //si borderColor n'est pas définit on met une couleur par défaut
    this.setBorder(this.borderColor || this.defaultColor)
  }

  //lorsque la souris sort de la card elle revient à son style d'origine
  @HostListener('mouseleave') onMouseLeave(){
    this.setBorder(this.initialColor)
  }

  //Hauteur
  setHeight(height : number){
    this.el.nativeElement.style.height = `${height}px`;
  }

  //Bordure
  setBorder(color : string){
    this.el.nativeElement.style.border = `solid 4px ${color}`;
  }

}
