import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
// import { ProductsComponent } from 'src/app/products/products.component';
// import { settings } from 'cluster';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products!: Product[];
  filterProducts!: Product[];
  subscription: Subscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private productService: ProductService) {
    this.subscription = productService.getAll<Product>()
      .subscribe(products => {
        this.filterProducts = this.products = products;
        this.dtTrigger.next(null);
        
      });
  }

  filterByTitle(query: string) {
    this.filterProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnInit(): void {
    this.dtOptions = {
      searching: false,
      pagingType: 'full_numbers',
      order: [0, 'asc'],
      columnDefs: [{
        targets: [2],//editRow
        orderable: false
      }]
    }
    // $.fn['dataTable'].ext.search.push((settings, data, dataIndex) => {
    //   const id = parseFloat(data[0]) || 0;
    //   if ((isNaN(this.min) && isNaN(this.max)) ||
    //   (isNaN(this.min) && id <= this.max) ||
    //   (this.min <= id && isNaN(this.max)) ||
    //   (this.min <= id && id<= this.max) {
    //     return true;
    //   }
    //   return false;
    // })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }


}
