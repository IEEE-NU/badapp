/*This doesn't work yo...
import { Pipe, IterableDiffers } from '@angular/core';

@Pipe({
  name: 'reverse',
  pure: false
})
export class ReversePipe {
  differ: any;
  cached: any;
  constructor(private differs:IterableDiffers) {
    
  }

  transform(value) {
    this.differ = this.differs.find(value).create(null);
    const changes = this.differ.diff(value);
    if (changes) {
      this.cached = value.slice().reverse();
    }
    return this.cached;    
  }
}
*/