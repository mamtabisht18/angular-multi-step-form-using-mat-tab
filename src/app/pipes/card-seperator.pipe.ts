import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardSeperator'
})
export class CardSeperatorPipe implements PipeTransform {

  finalValue = ''
  transform(value: string, ...args: number[]): string {
    this.finalValue = ''
    const length = args[0]
    const perGroup = args[1]
    // 16/4 = 4
  

    const steps = length/perGroup
    // 5   4 * 1 + 1
    // 10  4 * 2 + 2
    // 15  4 * 3 + 3
    // 1234-5678-1234-3213
    let returnValue = value
    let cardLength = returnValue.length
    if(returnValue.length >= perGroup) {
       returnValue = returnValue.replace(/\-/g, '');
       for(let i = 1; i<=steps; i++){
         let start = 4 * (i-1)
         let end = 4 * i
         if(returnValue.slice(start,end)){
          this.setValue(returnValue.slice(start,end))
         }
       }
    }
    return this.finalValue;
  }

  setValue(value){
    if(this.finalValue === '') {
      this.finalValue = `${value}`
    }else {
      this.finalValue = `${this.finalValue}-${value}`
    }
  }

}
