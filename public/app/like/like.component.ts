import {Component} from 'angular2/core';
import {ListingItem} from '../listing-item';

@Component({
  selector: 'like-component',
  template: `
    <span>{{ listing.likes }}Likes</span>
  `,
  inputs['listing']
})
export class LikeComponent{ 
  listing = {
    name: '', 
    bedroom: 0, 
    likes: 0
  };
}
