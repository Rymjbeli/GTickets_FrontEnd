import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirstWord'
})
export class CapitalizeFirstWordPipe implements PipeTransform {

  transform(value: string | undefined): string | undefined{
    if (!value) return '';
    const words = value.split(' ');
    if (words.length > 0) {
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    }
    return words.join(' ');
  }

}
