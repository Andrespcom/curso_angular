import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';



@Component({
  standalone: true,
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  public menuItems = routes
    .map((route) => route.children ?? [])
    .flat()
    .filter((route) => route && route.path)
    .filter((route) => !route.path?.includes(':'));

  constructor() {
    
    console.log(this.menuItems);
  }
}
