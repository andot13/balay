import {Component, EventEmitter} from 'angular2/core';
@Component({
  selector: 'create-listing',
  template: `
    <h2>Add listings</h2>
    <form action="">
      <label for="name">Name</label>
      <input type="text" [(ngModel)]="listing.name" id="name">
      <label for="name">Bedroom</label>
      <input type="text" [(ngModel)]="listing.bedroom" id="bedroom">
      <button (click)="onClick()">Create listing</button>
    </form>
  `,
  outputs: ['listAdded']
})
export class CreateListingComponent{
  listing = { 
    name: '',
    bedroom: 0
  };

  listAdded = new EventEmitter<{name: string, bedroom: number}>();

  onClick() {
    this.listAdded.emit(this.listing);
  }

}
