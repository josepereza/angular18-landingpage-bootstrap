import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://api.example.com/products'; // URL de API ficticia

  // Señal de productos con datos iniciales
  private productsSignal = signal<Product[]>([
    {
      id: 1,
      name: 'Producto Premium',
      description: 'Solución tecnológica de alta gama',
      price: 299.99,
      imageUrl: 'labtop2.png',
      category: 'Premium',
      rating: 4.8,
      inStock: true
    },
    {
      id: 2,
      name: 'Producto Estándar',
      description: 'Solución versátil para tus necesidades',
      price: 159.99,
      imageUrl: 'labtop4.jpg',
      category: 'Estándar',
      rating: 4.5,
      inStock: true
    },
    {
      id: 3,
      name: 'Producto Básico',
      description: 'Entrada perfecta a nuestra línea',
      price: 79.99,
      imageUrl: 'laptop1.jpg',
      category: 'Básico',
      rating: 4.2,
      inStock: false
    },
    {
      id: 4,
      name: 'Producto Básico',
      description: 'Entrada perfecta a nuestra línea',
      price: 179.99,
      imageUrl: 'laptop3.jpg',
      category: 'Básico',
      rating: 4.2,
      inStock: false
    }
  ]);

  constructor(private http: HttpClient) {}

  // Método para obtener productos
  getProducts(): Product[] {
    return this.productsSignal();
  }

  // Método para obtener productos por señal reactiva
  getProductsSignal() {
    return this.productsSignal;
  }

  // Método para obtener productos desde API (simulado)
  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map(products => {
        this.productsSignal.set(products);
        return products;
      }),
      catchError(error => {
        console.error('Error fetching products', error);
        return of(this.productsSignal());
      })
    );
  }

  // Filtrar productos por categoría
  getProductsByCategory(category: string): Product[] {
    return this.productsSignal().filter(p => p.category === category);
  }
}