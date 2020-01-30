import { Pipe, PipeTransform } from '@angular/core';
import { Department, } from '../model';

@Pipe({
  name: 'filterArr'
})
export class FilterArrPipe implements PipeTransform {

  transform(arr, search: string, property:string): [] {
    
    if(!search.trim()){
      return arr
    }

    return arr.filter( item => item[property].toLowerCase().indexOf(search.toLowerCase()) === 0)
  }
}
