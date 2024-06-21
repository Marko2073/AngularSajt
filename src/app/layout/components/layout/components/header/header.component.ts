import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../../../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  role: string = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const storedRole = localStorage.getItem('role');
    this.role = storedRole ? storedRole : '';
    return this.role === '1';
  }

  Logout() {
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
        localStorage.removeItem('role');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error logging out:', error);
        // Handle error scenarios, e.g., display an error message
      }
    );
  }
}
