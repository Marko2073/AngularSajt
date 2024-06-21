import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../products/interfaces/product";
import {ProductService} from "../../../products/buisness-logic/api/products.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  cartSmth: any[] = [];
  products: Product[] = [];
  total: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    const items = localStorage.getItem('cart');
    if (items) {
      this.cartSmth = JSON.parse(items);
    }

  }

  updateCartItems() {
    this.cartItems = this.products.filter((product) => {
      return this.cartSmth.some((item) => {
        return item.id === product.id;
      });
    });
    this.total = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      this.cartItems[i].quantity = this.cartSmth.find((item) => {
        return item.id === this.cartItems[i].id;
      }).quantity;
      this.total += this.cartItems[i].price * this.cartItems[i].quantity;
    }
  }

  onItemDeleted(id: string) {
    this.cartSmth = this.cartSmth.filter(item => item.id !== id);
    this.updateCartItems();
  }
  dodato(id: string) {
    this.cartSmth = this.cartSmth.map((item) => {
      if (item.id == id) {
        item.quantity++;
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(this.cartSmth));
    this.updateCartItems();
  }
  oduzeto(id: string) {
    this.cartSmth = this.cartSmth.map((item) => {
      if (item.id == id) {
        item.quantity--;
        if (item.quantity < 1) {
          item.quantity = 1;
        }
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(this.cartSmth));
    this.updateCartItems();
  }
}
