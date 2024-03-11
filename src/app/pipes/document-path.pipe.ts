import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'documentPath',
  standalone: true
})
export class DocumentPathPipe implements PipeTransform {

  transform(value: string): string {
    // value = value.replace(/\\\\/g, '/');
    value = value.replace(/\\/g, '/');
    value = value.replace('wwwroot/', '')
    const fullPath = environment.apiUrlWithoutUrl + value;
    console.log(fullPath)
    return fullPath;
  }


}
