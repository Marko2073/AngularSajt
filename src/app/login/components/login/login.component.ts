import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string="";

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit() {
    const formData = this.loginForm.value;
    const apiUrl = 'http://localhost:5175/api/auth';

    this.http.post(apiUrl, formData).subscribe(
      (response: any) => {
        const token = response.token;
        localStorage.setItem('token', token);

        const emailData = { email: formData.email };
        const userRoleUrl = 'http://localhost:5175/api/userrole';

        this.http.get(userRoleUrl, { params: emailData }).subscribe(
          (roleResponse: any) => {
            localStorage.setItem("role", roleResponse.roleId);
            localStorage.setItem("User", roleResponse.userId);
            this.router.navigate(['/products']);
          },
          (error) => {
            console.error('Error getting user role:', error);
          }
        );
      },
      (error) => {
        if (error.status === 401) {
          this.loginError = 'Neispravna šifra ili email.';
        } else {
          this.loginError = 'Greška prilikom logovanja.';
        }
        console.error('Error logging in:', error);
      }
    );
  }

}
