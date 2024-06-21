import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit() {
    const formData = this.loginForm.value;

    // Replace with your API endpoint
    const apiUrl = 'http://localhost:5175/api/auth';

    this.http.post(apiUrl, formData).subscribe(
      (response: any) => {
        const token = response.token;

        localStorage.setItem('token', token);

        // Get only the email from formData
        const emailData = { email: formData.email };

        // Replace with your API endpoint for userrole
        const userRoleUrl = 'http://localhost:5175/api/userrole';

        this.http.get(userRoleUrl, { params: emailData }).subscribe(
          (roleResponse: any) => {
            const role = roleResponse;
            localStorage.setItem('role', role);

            this.router.navigate(['/products']);
          },
          (error) => {
            console.error('Error:', error);
          }
        );

      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

}
