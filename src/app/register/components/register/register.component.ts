import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Dodajemo Validators radi obavezne validacije

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface RegisterUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordc: ['', Validators.required]
    });
  }

  // Getter za lakši pristup poljima forme
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Prekidamo ako forma nije validna
    if (this.registerForm.invalid) {
      return;
    }

    if (this.registerForm.value.password !== this.registerForm.value.passwordc) {
      console.error("Passwords do not match");
      return;
    }

    const registerUser: RegisterUserDto = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      phone: this.registerForm.value.phone,
      address: this.registerForm.value.address,
      city: this.registerForm.value.city
    };

    this.http.post('http://localhost:5175/api/users', registerUser).subscribe(response => {
      console.log(response);
      this.router.navigate(['/login']);
    }, error => {
      console.error(error);
    });
  }
}
