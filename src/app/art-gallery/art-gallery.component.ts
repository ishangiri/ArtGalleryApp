import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Validators, FormsModule, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Artist } from '../artist.model';


@Component({
  selector: 'app-art-gallery', 
  standalone: true,
  imports: [RouterOutlet,CommonModule, ReactiveFormsModule, FormsModule,RouterLink],
  templateUrl: './art-gallery.component.html',
  styleUrls: ['./art-gallery.component.css']
})
export class ArtGalleryComponent {
  
  showForm: boolean = false;
  showTable: boolean = false;
  showUpdateForm: boolean = false;
  showDialog:boolean = false;
  showFeatured: boolean = false;
  selectedIndex: number = -1;
  ArtistForm: FormGroup;
  UpdatedArtistForm: FormGroup;
  artists: Artist[] = [];
  featuredArtists: Artist[] = [];
  searchResult : Artist[] = [] ;
  artistId: number = 1;
  searchForm: FormGroup;
  showError : boolean = false;
  artistAddedSuccessfully: boolean = false;

  //constructor for the ArtistForm to add the artist
  constructor(private formBuilder: FormBuilder) {
    this.ArtistForm = this.formBuilder.group({
      name: ['', Validators.required],
      DOB: ['', Validators.required],
      gender: ['', Validators.required],
      exhibitionDate: ['', Validators.required],
      ArtworkType: ['', Validators.required],
      Notes: [''],
      Featured: ['',]
    });

    //constructor for the updatedArtistForm to update the artist
    this.UpdatedArtistForm = this.formBuilder.group({
      name: ['', Validators.required],
      DOB: ['', Validators.required],
      gender: ['', Validators.required],
      exhibitionDate: ['', Validators.required],
      ArtworkType: ['', Validators.required],
      Notes: ['', Validators.required],
      Featured: ['']
    })
    
    this.searchForm = this.formBuilder.group({
      searchId: ['', Validators.required]
    })
  }

 
//retrieve all the values from the formgropup and push it to the array to create a new artist
  addArtist(): void {
    if (this.ArtistForm.valid) {
      let artist: Artist = {
        artistId: this.artistId++,
        artistName: this.ArtistForm.value.name,
        DOB: this.ArtistForm.value.DOB,
        gender: this.ArtistForm.value.gender,
        artworkType: this.ArtistForm.value.ArtworkType,
        exhibitionDate: this.ArtistForm.value.exhibitionDate,
        specialNotes: this.ArtistForm.value.Notes,
        isFeatured: this.ArtistForm.value.Featured

      };
       
      this.showTable = true;
      this.artists.push(artist);
      this.ArtistForm.reset(); // Reset the form after adding the artist
      this.artistAddedSuccessfully = true;

      //remove the message after 3 seconds.
      setTimeout(()=>{
        this.artistAddedSuccessfully = false;
      }, 3000);
    }
  }

  //shows the confirmation dialog for deleteing the artist
  deleteArtist(index: number): void {
    this.selectedIndex = index; // Set the selected index
    this.showTable = false;
    this.showUpdateForm = false;
    this.showDialog = true;
  }

  //if confirmed deletes the artist from the array
  confirmDelete(confirm: boolean): void {
    if (confirm) {
      this.artists.splice(this.selectedIndex, 1); // Delete the selected artist
    }
    this.showTable = true;
    this.showDialog = false; 
  }
  
  //shows the table to update the artist
  updateArtist(index: number):void{
   this.selectedIndex = index;
   this.showUpdateForm = true;
   this.showTable = false;
   this.showFeatured= false;
}

//retrieve all the data from update form and change the values/data
update(): void {
  if (this.UpdatedArtistForm.valid) {
    const updatedArtist: Artist = {
      artistId: this.artists[this.selectedIndex].artistId, // Keep the same artistId
      artistName: this.UpdatedArtistForm.value.name,
      DOB: this.UpdatedArtistForm.value.DOB,
      gender: this.UpdatedArtistForm.value.gender,
      artworkType: this.UpdatedArtistForm.value.ArtworkType,
      exhibitionDate: this.UpdatedArtistForm.value.exhibitionDate,
      specialNotes: this.UpdatedArtistForm.value.Notes,
      isFeatured: this.UpdatedArtistForm.value.Featured
    };

    // Update the artist in the artists array
    this.artists[this.selectedIndex] = updatedArtist;

    // Hide the update form
    this.showUpdateForm = false;
    this.showTable = true;

    // Reset the updated form
    this.UpdatedArtistForm.reset();
  }
}

//closes the update form 
close():void{
  this.showUpdateForm = false;
}

//display all the artists
display():void{
  
 
  this.showTable = true;
  this.showFeatured = false;
  
}

// filter the artists array and show only the artist that are featured
displayFeatured():void{

  this.featuredArtists = this.artists.filter(artist => artist.isFeatured);
  this.showFeatured = true;
  this.showTable = false;
  

}

searchArtist(): void {
  if (this.searchForm.valid) {
    const searchId = this.searchForm.value.searchId;
    const foundArtist = this.artists.find(artist => artist.artistId === searchId);
    if (foundArtist) {
      this.searchResult = [foundArtist]; // Place the found artist in an array for consistency with other operations
    } else {
      this.searchResult = [];// Clear the search result if no artist is found and show the error
      this.showError = true;
      setTimeout(()=> {                  // remove the error after 3 seconds.
        this.showError = false; 
      }, 3000)
      
    }
  }
}
// check the validation of form.
isFormValid(): boolean {
  return this.ArtistForm.valid;
}
}

