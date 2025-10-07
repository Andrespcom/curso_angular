import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProductsService } from '@products/services/products.service';
import { Product } from '@products/interfaces/product';
import { AdminLayoutComponent } from "@dashboard/layouts/admin-dashboard-layout/admin-dashboard-layout.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";

@Component({
  selector: 'app-product-admin-page',
  imports: [AdminLayoutComponent, ProductDetailsComponent],
  templateUrl: './product-admin-page.component.html',
})
export class ProductAdminPageComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductsService);
  productId = toSignal(this.activatedRoute.params.pipe(map((params) => params['id'])));

  productResource = rxResource({
    params: () => ({ id: this.productId() }),
    stream: ({ params }) => {
      return this.productService.getProductById(params.id);
    },
  });
}
