import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone'
})
export class TelefonePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    const cleanedValue = value.replace(/\D/g, '');

    return cleanedValue.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1)$2-$3');
  }
}
