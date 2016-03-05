export class ListingService{
  
  getListings() {
    return [
      {
        name: "List",
        bedroom: 3,
        likes: 0,
        liked: false
      },
      {
        name: "Yeahh!",
        bedroom: 2,
        likes: 88 ,
        liked: true 
      },
      {
        name: "another list",
        bedroom: 2,
        likes: 0,
        liked: false
      }
    ]
  }
}
