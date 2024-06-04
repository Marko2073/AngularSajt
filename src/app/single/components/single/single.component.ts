import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../products/buisness-logic/api/products.service';

interface Product {
  id: any;
  name: any;
  brand_id: any;
  created_at: any;
  updated_at: any;
  brand_name: any;
  model_specification_id: any;
  current_price: any;
  stock: any;
  old_price: any;
  photos: any[];
  specifications : any[];
}

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css'],
})
export class SingleComponent implements OnInit {
  public id: string = '';
  public products: Product[] = [];
  public product: Product | undefined;

  constructor(private route: ActivatedRoute, private productService: ProductService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      // Sada kada imamo id, možemo dobiti proizvode
      this.productService.getProducts().subscribe({
        next: (data: Product[]) => {
          this.products = data;
          this.product = this.products.find((product: Product) => product.id == this.id);
          console.log(this.product);
        },
        error: (err) => {
          console.log(err);
        }
      });
    });
  }



}
