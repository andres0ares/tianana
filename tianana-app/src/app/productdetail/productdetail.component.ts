import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Pedido } from '../../shared/pedido';
import { Product } from '../../shared/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {

  product: Product;
  errMess: String;
  principalImage: String;
  optionInfo: String;
  selection: {selected: Boolean, name: String, image: String};
  pedido: Pedido;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {

    this.pedido = new Pedido;

    const id = this.route.snapshot.params['id'];

    this.productService.getProduct(id)
      .subscribe(
        (product) => {
          this.product = product;
          this.principalImage = product.image; 
          this.pedido.product = product;
        },
      errmess => this.errMess = <any>errmess
    );  

    this.optionInfo = 'Selecione uma opção.'
    this.selection = {selected: false, name: '', image: ''};
        

  }
  
  imgClicked(image): void {
    this.principalImage = image;
  }

  optionClicked(option): void {
    this.optionInfo = `${option.name} selecionado. Seu tecido é ${option.fabric}. ${option.color} é sua cor predominante. Ótima escolha!`;
    this.imgClicked(option.image);
    this.selection = { selected: true, name: option.name, image: option.image};
    this.pedido.option = option;
  }

  onSubmit() {
    console.log(this.pedido);
  }

  goBack(): void {
    this.location.back();
  }

}
