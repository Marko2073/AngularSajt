import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
@Component({
  selector: 'app-cart-side',
  templateUrl: './cart-side.component.html',
  styleUrl: './cart-side.component.css'
})
export class CartSideComponent implements OnInit{
  @Input() cartItems: any[] = [];
  @Input() total: number = 0;
  constructor(private router: Router) {
  }

  ngOnInit() {

  }
  Checkout(event: any) {
    localStorage.removeItem('cart');
    this.cartItems = [];
    this.total = 0;
    this.router.navigate(['/home']);
  }



}
