import { Component, inject } from '@angular/core';
import { ProductsService } from '@products/services/products.service';
import { ProductCard } from '@store-front/components/product-card/product-card';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { Pagination } from "@shared/components/pagination/pagination";
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PaginationService } from '@shared/components/pagination/pagination.service';


@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.html',
})
export class HomePage {

  productsService = inject(ProductsService)
  paginationService = inject(PaginationService)

  productsResorce = rxResource({
    params: () => ({ page: this.paginationService.currentPage() - 1 }),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        offset: params.page * 9
      });
    }
  })
  // activatedRoute = inject(ActivatedRoute)


  // currentPage = toSignal(
  //   this.activatedRoute.queryParamMap.pipe(
  //     map(params => (params.get('page') ? +params.get('page')! : 1)),
  //     map(page => (isNaN(page) ? 1 : page))
  //   ),
  //   {
  //     initialValue: 1,
  //   }
  // )




}
