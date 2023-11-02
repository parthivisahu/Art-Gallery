import { Component, OnInit } from '@angular/core';
import { WishlistedArtwork, WishlistedData } from 'src/shared/artWork.model';
import { ArtworksService } from 'src/shared/artWork.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],

  animations: [
    trigger('noItemsAnimation', [
      state('no-items-animation', style({
        transform: 'scale(1.2)'
      })),
      transition('* => no-items-animation', animate('2s ease-in-out')),
    ]),
    trigger('fadeAnimation', [
      state('void', style({
        opacity: 0
      })),
      transition('void => *', animate('2s ease-in-out')),
      transition('* => void', animate('2s ease-in-out'))
    ])
  ]
})
export class WishlistComponent implements OnInit {
  wishlist:number[] = []
  noItemsState = '';
  wishlistedItems:WishlistedData[] = []
  constructor(public artworkService:ArtworksService){
    this.setWishlist();
    this.getWishlistedItems()
  }
  ngOnInit(): void {
    if (this.wishlist.length === 0) {
      this.noItemsState = 'no-items-animation'; // Start the animation
    }
  }
  setWishlist(){
    this.wishlist = this.artworkService.wishlist;
    this.getWishlistedItems();
  }
  deleteFromWishlist(id:number){
    this.artworkService.deleteFromWishlist(id);
    if(this.wishlist.length === 0 ){
      this.noItemsState = 'no-items-fade';
    }
    this.setWishlist();
  }
  getWishlistedItems(){
    this.artworkService.getWishlistedData().subscribe(data=>{
      this.wishlistedItems = (data as WishlistedArtwork).data;
      console.log(this.wishlistedItems);
    })

  }

}
