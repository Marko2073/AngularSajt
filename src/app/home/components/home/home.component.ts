import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../../products/buisness-logic/api/products.service";
import { Product } from "../../../products/interfaces/product";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Promenjeno iz styleUrl u styleUrls
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  featuredProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.selectFeaturedProducts();
    });
  }

  private getSeededRandom(seed: number): number {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  private selectFeaturedProducts() {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const uniqueIndices = new Set<number>();

    while (uniqueIndices.size < 4 && uniqueIndices.size < this.products.length) {
      const randomIndex = Math.floor(this.getSeededRandom(seed + uniqueIndices.size) * this.products.length);
      uniqueIndices.add(randomIndex);
    }

    this.featuredProducts = Array.from(uniqueIndices).map(index => this.products[index]);
  }
  AddToCart(event:any, id:string){

    let cart: any[] = [];
    let item = {
      id: id,
      quantity: 1
    };
    let cartData = localStorage.getItem('cart');
    if(cartData == null){
      cart.push(item);
      localStorage.setItem('cart', JSON.stringify(cart));


    } else {
      let index = -1;
      cart = JSON.parse(cartData);
      for(let i = 0; i < cart.length; i++){
        if(cart[i].id === id){
          index = i;
          break;
        }
      }
      if(index === -1){
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        cart[index].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }

  }
}
