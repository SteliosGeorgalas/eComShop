import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductsComponent } from 'src/app/products/products.component';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products!: Product[];
  filterProducts!: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = productService.getAll<Product>()
      .subscribe(products => this.filterProducts = this.products = products);
  }

  filterByTitle(query: string) {
    this.filterProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
