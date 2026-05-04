import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { ProductCarrousel } from "@products/components/product-carrousel/product-carrousel";

@Component({
  selector: 'app-product-page',
  imports: [ProductCarrousel],
  templateUrl: './product-page.html',
})
export class ProductPage {

  productSlug = inject(ActivatedRoute).snapshot.params['idSlug']
  productService = inject(ProductsService)

  productsResorce = rxResource({
    params: () => ({ idSlug: this.productSlug }),
    stream: ({ params }) => {
      return this.productService.getProductBySlug(params.idSlug);
    }
  })
}
