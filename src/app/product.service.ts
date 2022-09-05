import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { User } from 'firebase/auth';
import { map } from 'rxjs/operators'
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) {
  }

  create(product: any) {
    return this.db.list('/products').push(product);
  }

  getAll<T>() {
    return this.db.list<T>('/products', ref => ref.orderByChild('title'))
      .snapshotChanges().pipe(
        map(products => products.map(product => {
          const value = <any>Object.assign({}, product.payload.val());
          value.key = product.key;
          return <T>value;
        }))
      );
  }


  get(productId: any) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId: any, product: any) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: any) {
    return this.db.object('/products/' + productId).remove();
  }
}