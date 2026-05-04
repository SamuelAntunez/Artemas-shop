import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductCarrousel } from '@products/components/product-carrousel/product-carrousel';
import { Product } from '@products/interfaces/product.interface';
import { ProductsService } from '@products/services/products.service';
import { FormErrorLabel } from '@shared/components/form-error-label/form-error-label';
import { FormUtils } from '@utils/form-utils';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-details',
  imports: [ProductCarrousel, ReactiveFormsModule, FormErrorLabel],
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {
  product = input.required<Product>();

  router = inject(Router)
  fb = inject(FormBuilder)

  productService = inject(ProductsService)

  wasSaved = signal(false)
  tempImages = signal<string[]>([])
  imageFilesList: FileList | undefined = undefined

  imagesToCarrousel = computed(() => {
    return [...this.product().images, ...this.tempImages()]
  })

  productForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    price: ['', [Validators.required, Validators.min(1)]],
    stock: ['', [Validators.required, Validators.min(1)]],
    sizes: [['']],
    images: [[]],
    tags: [''],
    gender: ['men', [Validators.required, Validators.pattern(/men|women|kids|unisex/)]]

  })

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  ngOnInit(): void {
    this.setFormValue(this.product())
  }


  // setFormValue(formLike: Partial<Product>) {

  //   this.productForm.patchValue(formLike as any)
  //   this.productForm.patchValue({ tags: formLike.tags?.join(', ') })
  // }

  setFormValue(formLike: Partial<Product>) {
    this.productForm.patchValue({
      ...formLike,
      tags: formLike.tags?.join(', ') // Esto asegura que el valor final sea el string
    } as any);
  }

  onSizeClick(size: string) {
    const currentSizes = this.productForm.value.sizes ?? []

    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1)
    } else {
      currentSizes.push(size)
    }

    this.productForm.patchValue({ sizes: currentSizes })
  }

  async onSubmit() {
    const isValid = this.productForm.valid
    this.productForm.markAllAsTouched()

    if (!isValid) return;

    const formValue = this.productForm.value

    const productLike: Partial<Product> = {
      ...formValue as any,
      tags: formValue.tags
        ?.toLowerCase()
        .split(',').map(tag => tag.trim()) ?? []
    }



    if (this.product().id === 'new') {
      const product = await firstValueFrom(
        this.productService.createProduct(productLike, this.imageFilesList)
      )
      this.router.navigate(['/admin/products', product.id])

    } else {
      await firstValueFrom(
        this.productService.updateProduct(this.product().id, productLike, this.imageFilesList)
      )
    }

    this.wasSaved.set(true)

    setTimeout(() => {
      this.wasSaved.set(false)
    }, 2000)

  }

  onFilesChanged(event: Event) {

    const fileList = (event.target as HTMLInputElement).files;
    this.imageFilesList = fileList ?? undefined
    const imageUrls = Array.from(fileList ?? []).map(file => URL.createObjectURL(file))
    this.tempImages.set(imageUrls)
  }

}
