import {Component, EventEmitter} from 'angular2/core';
import {ListingItem} from '../listing-item';

@Component({
  selector: 'edit-listing',
  template: `
    <form action="">
      <label for="name">Name</label>
      <input type="text" [(ngModel)]="listing.name" id="name">
      <label for="name">Bedroom</label>
      <input type="text" [(ngModel)]="listing.bedroom" id="bedroom">
      <button (click)="onDelete()">Delete listing</button>
    </form>
  `,
  inputs: ['listing'],
  outputs: ['removed']

})
export class EditListingComponent {
  listing = {name: '', bedroom: 0};
  removed = new EventEmitter<ListingItem>();

  onDelete() {
    this.removed.emit(this.listing);
  }
}
