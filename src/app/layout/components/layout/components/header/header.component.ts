import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AuthService} from "../../../../../auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private http: HttpClient, private router: Router, private authService : AuthService) {}

  isLoggedIn(): boolean {
    if(localStorage.getItem('token')){
      return true;
    }
    else {
      return false;
    }
  }

  Logout() {
    // Remove token from localStorage

    // Endpoint for logout API
    const apiUrl = 'http://localhost:5175/api/auth';

    // Prepare headers with token
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    // Send DELETE request with headers
    this.http.delete(apiUrl, { headers }).subscribe(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error logging out:', error);
        // Handle error scenarios, e.g., display an error message
      }
    );
  }
}
