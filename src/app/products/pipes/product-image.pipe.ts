import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl

@Pipe({
  name: 'productImage'
})

export class ProductImagePipe implements PipeTransform {
  transform(value: string | string[] | null): any {
    if (value === null) return './assets/images/no-image.jpg'

    if (!value) return './assets/images/no-image.jpg'

    if (typeof value === 'string' && value.startsWith('blob:')) return value

    if (Array.isArray(value)) {
      return value.length > 0 ? `${baseUrl}/files/product/${value[0]}` : './assets/images/no-image.jpg'
    }

    return `${baseUrl}/files/product/${value}`
  }
}
