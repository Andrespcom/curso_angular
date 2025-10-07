import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { Product, ProductsResponse } from '@products/interfaces/product';
import { ProductsService } from '@products/services/products.service';
import { map } from 'rxjs';
import { PaginationComponent } from "@shared/components/pagination/pagination.component";
import { PaginationService } from '@shared/components/pagination/pagination.service';
// import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  productService = inject(ProductsService);
  paginationService = inject(PaginationService)

  productResource = rxResource({
    params: () => ({page: this.paginationService.currentPage() - 1}),
    stream: ({params}) => {
      return this.productService
        .getProducts({
          // limit: 100,
          // gender: '',
          offset: params.page * 9, 
        });
    },
    
  });
}
