import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCarouselComponent } from '@products/components/product-carousel/product-carousel.component';
import { Product } from '@products/interfaces/product';
import { ProductsService } from '@products/services/products.service';
import { FormUtils } from '@utils/form-utils';
import { FormErrorLabelComponent } from '@shared/components/form-error-label/form-error-label.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-details',
  imports: [ProductCarouselComponent, ReactiveFormsModule, FormErrorLabelComponent],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {
  product = input.required<Product>();
  fb = inject(FormBuilder);

  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    tags: [''],
    images: [[]],
    gender: ['men', [Validators.required, Validators.pattern(/men|women|kid|unisex/)]],
  });

  activatedRoute = inject(ActivatedRoute);

  router = inject(Router);

  productService = inject(ProductsService);

  wasSaved = signal(false);

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  tempImages = signal<string[]>([]);

  imageFileList: FileList | undefined = undefined;

  imagesToCarousel = computed(() => {
    const currentProductImages = [...this.product().images, ...this.tempImages()];
    return currentProductImages;
  });

  async onSubmit() {
    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched();

    if (!isValid) return;
    const formValue = this.productForm.value;

    const productLike: Partial<Product> = {
      ...(formValue as any),
      tags:
        formValue.tags
          ?.toLowerCase()
          .split(',')
          .map((tag) => tag.trim()) ?? [],
    };

    if (this.product().id === 'new') {
      // Crear producto
      const product = await firstValueFrom(this.productService.createProduct(productLike,this.imageFileList));

      this.router.navigate(['/admin/products', product.id]);
    } else {
      await firstValueFrom(this.productService.updateProduct(this.product().id, productLike, this.imageFileList));
    }

    this.wasSaved.set(true);
    setTimeout(() => {
      this.wasSaved.set(false);
    }, 3000);
  }

  setFormValue(formLike: Partial<Product>) {
    // this.productForm.reset(this.product() as any);
    this.productForm.patchValue(formLike as any);
    this.productForm.patchValue({ tags: formLike.tags?.join(',') });
  }

  onSizeClicked(size: string) {
    const currentSizes = this.productForm.value.sizes ?? [];

    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1);
    } else {
      currentSizes.push(size);
    }
    this.productForm.patchValue({ sizes: currentSizes });
  }

  ngOnInit(): void {
    this.setFormValue(this.product());
  }

  onFilesChanged($event: Event) {
    const fileList = (event?.target as HTMLInputElement).files;
    this.imageFileList = fileList ?? undefined;
    console.log(fileList);
    const imageUrls = Array.from(fileList ?? []).map((file) => URL.createObjectURL(file));
    console.log(imageUrls);
    this.tempImages.set(imageUrls);
  }
}
