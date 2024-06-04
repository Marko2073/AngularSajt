import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',

})
export class ContactComponent {
value = "ContactComponent";
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', [Validators.required]);
  subjectFormControl = new FormControl('', [Validators.required]);
  MessageFormControl = new FormControl('', [Validators.required]);
}
