import {Component} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ContactService} from "../../buisness-logic/api/contact.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',

})
export class ContactComponent {
  constructor(private contactService: ContactService, private router: Router) {
  }


  value = "ContactComponent";
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', [Validators.required]);
  subjectFormControl = new FormControl('', [Validators.required]);
  MessageFormControl = new FormControl('', [Validators.required]);

  formSend() {
    if (this.emailFormControl.valid && this.nameFormControl.valid && this.subjectFormControl.valid && this.MessageFormControl.valid) {

      this.contactService.postMessage({
        email: this.emailFormControl.value,
        name: this.nameFormControl.value,
        subject: this.subjectFormControl.value,
        message: this.MessageFormControl.value
      }).subscribe({
        next: (data) => {
          console.log(this.emailFormControl.value);
          this.router.navigate(['/home']);




        },
        error: (err) => {
          console.log(err);

        }
      });


    } else {
      alert("Please fill in all the fields");
    }


  }
}
