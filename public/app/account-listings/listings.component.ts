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
    <ul class="nav nav-pills">
      <li [class.active]="viewMode == 'list'">
        <a (click)="onViewMode($event)" href="">List</a>
      </li>
      <li [class.active]="viewMode == 'grid'">
        <a (click)="onViewMode($event)" href="">Grid</a>
      </li>
    </ul>
  </section>
  <section [ngSwitch]="viewMode">
    <template [ngSwitchWhen]="'list'" ngSwitchDefault>
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
    </template>

    <template [ngSwitchWhen]="'grid'">
      <h2>This are you listings</h2>
      <div class="card col-sm-3" *ngFor="#listItem of listingItems"
          (click)="onSelect(listItem)">
          {{ listItem.name }}
          {{ listItem.bedroom }}
          <like-component></like-component>
      </div>
    </template>
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
  viewMode: 'grid';

  constructor(listingService: ListingService) {
    this.listingItems = listingService.getListings();
  }

  onViewMode(event){
    event.preventDefault();

    if(this.viewMode === 'list') {
      this.viewMode = 'grid';
    }else if (this.viewMode === 'grid'){
      this.viewMode = 'list';
    }
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
