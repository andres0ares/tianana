import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  errMess: String;
  products:  Product[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe((products) => this.products = products,
      errmess => this.errMess = <any>errmess
    );
  }


}
