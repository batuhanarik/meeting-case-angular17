import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imagePath',
  standalone: true
})
export class ImagePathPipe implements PipeTransform {

  transform(value: string): string {
    value = value.replace(/\\/g, '/');

    const fullPath = environment.apiUrlWithoutUrl + value;
    console.log(fullPath)
    return fullPath;
  }

}
