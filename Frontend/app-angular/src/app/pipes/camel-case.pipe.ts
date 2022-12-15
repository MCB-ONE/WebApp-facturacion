import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseSplit'
})
export class CamelCasePipe implements PipeTransform {

  transform(camelCase: string): string {
    let ccSplit = camelCase.split(/(?=[A-Z])/).join(" ")
    return ccSplit;
  }

}
