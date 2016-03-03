import {Component} from 'angular2/core';
import {CreateListingComponent} from './create-listing.component';
@Component({
  selector: 'account-listings',
  directives: [CreateListingComponent],
  template: `
  <section>
    <create-listing (listAdded)="onListingAdded($event)"></create-listing>
  </section>
  <section>
    <h2>This are you listings</h2>
    <ul>
      <li *ngFor="#listItem of listingItems">
        {{ listItem.name }}
      </li>
    </ul>
  </section>
  <section>
    Edit item
  </section>
  `
})
export class AccountListingsComponent{
  listingItems = new Array<{name: String, bedroom: Number}>();
  // listingItems = [
  //   {name: 'Test', bedroom: 1},
  //   {name: 'Test', bedroom: 1},
  //   {name: 'Test', bedroom: 1},
  //   {name: 'Test', bedroom: 1}
  // ];

  onListingAdded( listing: {name: string, bedroom: number}){
    this.listingItems.push({ name: listing.name, bedroom: listing.bedroom});
  }

}
