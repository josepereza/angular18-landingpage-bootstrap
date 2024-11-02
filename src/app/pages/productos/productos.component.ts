import { Component, inject } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  private productService = inject(ProductService);
  
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string = 'Todos';

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.filteredProducts = category === 'Todos' 
      ? this.products 
      : this.products.filter(p => p.category === category);
  }
}
