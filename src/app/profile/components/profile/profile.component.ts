import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  orders: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get('http://localhost:5175/api/UserCarts', { headers }).subscribe({
        next: (data: any) => {
          this.orders = data;
          console.log('User carts', this.orders);
        },
        error: (error) => {
          console.error('Error fetching user carts', error);
        }
      });
    } else {
      console.error('No JWT token found in localStorage');
    }
  }

  getTotalPrice(order: any): number {
    return order.products.reduce((total: number, product: any) => total + (product.price * product.quantity), 0);
  }

  getShippingCost(totalPrice: number): number {
    return totalPrice >= 999 ? 0 : 10;
  }
}
