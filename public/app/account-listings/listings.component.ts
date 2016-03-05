import {Component} from 'angular2/core';
import {CreateListingComponent} from './create-listing.component';
import {EditListingComponent} from './edit-listing.component';
import {LikeComponent} from '../like/like.component';

import {ListingItem} from '../listing-item';

import {ListingService} from '../services/listing.service';

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
        <like-component></like-component>
      </li>
    </ul>
  </section>
  <section *ngIf="selectedListing != null">
    <edit-listing
      [listing]="selectedListing"
      (removed)="onRemove($event)"
    >
    </edit-listing>
  </section>
  `,
  directives: [
    CreateListingComponent, 
    EditListingComponent,
    LikeComponent
  ],
  providers: [ListingService]
})
export class AccountListingsComponent{
  listingItems = new Array<ListingItem>();
  selectedListing: ListingItem;
  listing: ListingItem;

  constructor(listingService: ListingService) {
    this.listingItems = listingService.getListings();
  }

  onListingAdded(listing) {
    this.listingItems.push({ 
      name: listing.name, 
      bedroom: listing.bedroom,
      likes: listing.likes
    });
  }

  onSelect(listing) {
    this.selectedListing = listing;
  }

  onRemove(listing){
    this.listingItems.splice(this.listingItems.indexOf(listing), 1);
    this.selectedListing = null;
  }

}
