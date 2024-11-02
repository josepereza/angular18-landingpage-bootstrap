import { Component } from '@angular/core';
import { ProductosComponent } from '../productos/productos.component';
import { HeroComponent } from '../../components/hero/hero.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeroComponent,ProductosComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
