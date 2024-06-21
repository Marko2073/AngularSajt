import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../buisness-logic/api/products.service';
import { BrandsService } from '../../buisness-logic/api/brands.service';
import { ModelsService } from "../../buisness-logic/api/models.service";
import { Product } from "../../interfaces/product";
import {Model} from "../../interfaces/model";
import {ActivatedRoute} from "@angular/router";
import {SpecificationsService} from "../../buisness-logic/api/specifications.service";
import {filter} from "rxjs";

export const PRODUCTS_PER_PAGE = 5;
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  brands: any[] = [];
  models: any[] = [];
  specifications: any[] = [];
  selectedBrand: number =0;
  selectedModel: number = 0;
  filteredProducts: any[] = [];
  filteredModels: Model[] = [];
  showModal: boolean = false;
  selectedValue: string = '';
  currentPage: number = 1;
  totalPages: number = 2;
  niz: any[] = [];
  selectedFilters: any = {
    brandId: 0,
    modelId: 0,
    specifications: [],
  };
  constructor(
    private productService: ProductService,
    private brandsService: BrandsService,
    private modelsService: ModelsService,
    private route:ActivatedRoute,
    private specificationsService: SpecificationsService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      // Dohvatanje svih proizvoda
      const productsResponse = await this.productService.getAllProducts().toPromise();
      this.totalPages = Math.ceil(productsResponse.length / PRODUCTS_PER_PAGE);
      this.niz = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      console.log(productsResponse)

      // Dohvatanje brendova
      const brandsResponse = await this.brandsService.getBrands().toPromise();
      this.brands = brandsResponse;

      // Dohvatanje modela
      const modelsResponse = await this.modelsService.getModels().toPromise();
      this.models = modelsResponse;

      // Dohvatanje specifikacija
      const specificationsResponse = await this.specificationsService.getSpecifications().toPromise();
      this.specifications = specificationsResponse;

      // Pretplata na queryParams promene
      this.route.queryParams.subscribe(params => {
        const page = +params['page'] || 1;
        this.currentPage = page;
        this.getProductsByPage(page);
      });

    } catch (error) {
      console.error('Error during initialization:', error);
    }
  }



  filterModels(brandId: number): void {
    console.log(brandId);
    this.selectedBrand = brandId;
    console.log(this.selectedBrand);
    this.filteredModels = this.models.filter((model) => {
      return model.brandId === brandId;
    });
    this.filterProductsAll("brand", brandId);
  }
  getProductsByPage(page: number): void {
    this.productService.getProducts(page).subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data; // Update filteredProducts as needed


      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  filterProductsAll(type: string, id:number): void {
    if(type === "brand"){
      this.selectedFilters.brandId = id;
      this.selectedFilters.modelId = 0;
    }else if(type === "model"){
      this.selectedFilters.modelId = id
    }
    else if(type === "specification"){
      if(this.selectedFilters.specifications.includes(id)){
        const index = this.selectedFilters.specifications.indexOf(id);
        this.selectedFilters.specifications.splice(index, 1);
      }else{
        this.selectedFilters.specifications.push(id);
      }
    }
    this.productService.getFilteredProducts(this.selectedFilters).subscribe({
      next: (data) => {
        this.filteredProducts = data;
        this.totalPages = Math.ceil(data.length / PRODUCTS_PER_PAGE);
        this.niz = [];
        for (let i = 1; i <= this.totalPages; i++) {
          this.niz.push(i);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });



  }
}
