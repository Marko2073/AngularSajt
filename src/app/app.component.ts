import { Component, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'my-app';

  ngAfterViewInit() {
    $('.navbar-toggler').on('click', function() {
      $('#navbarCollapse').collapse('toggle');
    });
  }
}
