import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  errMess: string;
  products:  Product[];

  constructor(private productService: ProductService) { } 

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe((products) => this.products = products,
      errmess => this.errMess = <any>errmess
    );
  }

}
