import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') isOpen=false;


  constructor() { }

  @HostListener('click') toggleDropdown()
  {
    this.isOpen=!this.isOpen;
  }


}
