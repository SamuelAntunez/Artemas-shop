import { Component, computed, input, linkedSignal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.html',
})
export class Pagination {

  pages = input<number>(1);
  currentPage = input(1);
  activePage = linkedSignal(this.currentPage) // Se utiliza cuando necesitamos trabajar con una señal que se envia con input


  getPagesList = computed(() => {
    return Array.from({ length: this.pages() }, (_, i) => i + 1)
  });


}
