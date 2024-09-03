import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unique'
})
export class UniquePipe implements PipeTransform {

  transform(item: any[], key: string): any[] {
    if(!item||!Array.isArray(item)) return item;
    const uniqueValues = new Set();
    // lodash uniqBy function
    item.forEach(value=>{
      uniqueValues.add(value[key]);
    });
    return Array.from(uniqueValues);
  }

}
