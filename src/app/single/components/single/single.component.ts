import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../products/buisness-logic/api/products.service';
import {Product} from "../../../products/interfaces/product";



@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css'],
})
export class SingleComponent implements OnInit {
  public id: string = '';
  public products: Product[] = [];
  public product: any | undefined;
  public showModal: boolean = false;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.productService.getOneProduct(this.id).subscribe({
        next: (data: Product) => {
          this.product = data;
          console.log(this.product)
        },
        error: (err) => {
          console.error('Error fetching product', err);
        }
      });
    });
  }

  AddToCart(event: any, id: string) {
    let cart: any[] = [];
    let item = {
      id: id,
      quantity: 1
    };
    let cartData = localStorage.getItem('cart');
    if (cartData == null) {
      cart.push(item);
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      let index = -1;
      cart = JSON.parse(cartData);
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        cart[index].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }

    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
