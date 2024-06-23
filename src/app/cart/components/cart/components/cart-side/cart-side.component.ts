import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart-side',
  templateUrl: './cart-side.component.html',
  styleUrls: ['./cart-side.component.css']
})
export class CartSideComponent implements OnInit {
  @Input() cartItems: any[] = [];
  @Input() total: number = 0;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    // Initialize cartItems and total from localStorage if necessary
  }

  Checkout(event: any) {
    const userId = localStorage.getItem('User');
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    if (userId && cart.length > 0) {
      // Send each cart item to the /api/purchase endpoint
      cart.forEach((item: any) => {
        const purchaseData = {
          userId: userId,
          modelVersionId: item.id,
          quantity: item.quantity
        };

        this.http.post('http://localhost:5175/api/Purchases', purchaseData).subscribe({
          next: (response) => console.log('Purchase successful for item', item),
          error: (error) => console.error('Error during purchase', error)
        });
      });

      // Send a request to the /api/confirmpurchase endpoint
      const confirmPurchaseData = {
        userId: userId
      };

      this.http.post('http://localhost:5175/api/ConfirmPurchase', confirmPurchaseData).subscribe({
        next: (response) => console.log('Purchase confirmed'),
        error: (error) => console.error('Error during purchase confirmation', error),
        complete: () => {
          // Clear the cart
          localStorage.removeItem('cart');
          this.cartItems = [];
          this.total = 0;
          // Navigate to the home page
          this.router.navigate(['/home']);
        }
      });
    } else {
      console.error('User ID or cart is empty');
    }
  }
}
