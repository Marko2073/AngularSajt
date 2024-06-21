import {Component, AfterViewInit, OnInit} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'my-app';
  cart: any[] = [];
  ngAfterViewInit() {
    $('.navbar-toggler').on('click', function() {
      $('#navbarCollapse').collapse('toggle');
    });
  }
  ngOnInit() {
    this.cart=JSON.parse(localStorage.getItem('cart') as string);
    if(this.cart==null){
      this.cart=[];
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }

  }

}
