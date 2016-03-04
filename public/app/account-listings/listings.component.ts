import {Component} from 'angular2/core';
import {CreateListingComponent} from './create-listing.component';
import {EditListingComponent} from './edit-listing.component';
import {ListingItem} from '../listing-item';

@Component({
  selector: 'account-listings',
  template: `
  <section>
    <create-listing (listAdded)="onListingAdded($event)"></create-listing>
  </section>
  <section>
    <h2>This are you listings</h2>
    <ul>
      <li 
        *ngFor="#listItem of listingItems"
        (click)="onSelect(listItem)">
        {{ listItem.name }}
        {{ listItem.bedroom }}
      </li>
    </ul>
  </section>
  <section *ngIf="selectedListing != null">
    <edit-listing [listing]="selectedListing"></edit-listing>
  </section>
  `,
  directives: [
    CreateListingComponent, 
    EditListingComponent
  ]
})
export class AccountListingsComponent{
  listingItems = new Array<ListingItem>();
  selectedListing: ListingItem;
  listing: ListingItem;

  onListingAdded( listing: ListingItem) {
    this.listingItems.push({ name: listing.name, bedroom: listing.bedroom});
  }

  onSelect(listing: ListingItem) {
    this.selectedListing = listing;
  }

}
