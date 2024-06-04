import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../buisness-logic/api/products.service';
import { BrandsService } from '../../buisness-logic/api/brands.service';
import { ModelsService } from "../../buisness-logic/api/models.service";
import { Product } from "../../interfaces/product";
import {Model} from "../../interfaces/model";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  brands: any[] = [];
  models: any[] = [];
  selectedBrands: string[] = [];
  selectedModels: string[] = [];
  filteredProducts: Product[] = [];
  filteredModels: Model[] = [];
  brandids: string[] = [];
  idSel: string = '';

  constructor(private productService: ProductService, private brandsService: BrandsService, private modelsService: ModelsService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data; // Initialize filteredProducts with all products
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.brandsService.getBrands().subscribe({
      next: (data) => {
        this.brands = data;

      },
      error: (err) => {
        console.log(err);
      }
    });
    this.modelsService.getModels().subscribe({
      next: (data) => {
        this.models = data;
        this.filteredModels = data;

      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  filterProducts(event: any, type: string, name: string): void {
    const isChecked = event.target.checked;

    if (type === 'brand') {
      const brandId = this.brands.find(brand => brand.name === name).id.toString();
      if (isChecked) {
        this.selectedBrands.push(name);
        this.brandids.push(brandId);
      } else {
        this.selectedBrands = this.selectedBrands.filter(brand => brand !== name);
        this.brandids = this.brandids.filter(id => id !== brandId);
      }
    } else if (type === 'model') {
      if (isChecked) {
        this.selectedModels.push(name);
      } else {
        this.selectedModels = this.selectedModels.filter(model => model !== name);
      }
    }

    if (this.selectedBrands.length > 0) {
      this.filteredProducts = this.products.filter(product => {
        const brandMatch = this.selectedBrands.length ? this.selectedBrands.includes(product.brand_name) : true;
        const modelMatch = this.selectedModels.length ? this.selectedModels.includes(product.name) : true;
        return brandMatch && modelMatch;
      });


      this.filteredModels = this.models.filter(model => this.brandids.includes(model.brand_id.toString()));
    } else {
      this.filteredProducts = this.products;
      this.filteredModels = this.models;
    }
  }


}
