import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Artwork, ArtworkList } from 'src/shared/artWork.model';
import { ArtworksService } from 'src/shared/artWork.service';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css'],
  
})
export class TableViewComponent {
  isFavourite = false;
  checkFavourite(imageId: string) {
    const index = this.favourites.findIndex((fav: any) => fav.imageId === imageId);
    this.isFavourite = index !== -1;
  }
  

  favourites: any[] = [];
  addToFavourites(image: any) {
    this.favourites.push(image);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  displayedColumns: string[] = ['image_id','title','artist_title', 'place_of_origin', 'date_display'];
  dataSource = new MatTableDataSource<Artwork>([]);
  pageTotal = 0;
  pageIndex = 0;
  constructor(private artworksService: ArtworksService, private router: Router) {}
  public artworksLoaded = false;
  ngOnInit() {
    this.getArtworks(this.pageIndex,50);
    // this.checkFavourite(element.image_id);
  }
  getArtworks(index: number,size :number ){
    this.artworksService.getArtworksPage(index+1,size).subscribe(
      (response: ArtworkList) => {
        if (response.data.length) {
          console.log(response.data.length);
          
          this.dataSource = new MatTableDataSource<Artwork>(response.data);
          this.artworksLoaded = true;
          this.pageTotal = response.pagination.total;
          this.pageIndex = response.pagination.current_page;
          console.log(this.pageIndex);
        }
        else
        {
          this.artworksLoaded = false;
        }
      },
    );
  }
  PageAmount(size :PageEvent)
  {
    console.log(size);
    this.getArtworks(size.pageIndex,size.pageSize);
  }
  todetailview (id: string)
  {
    console.log(id);
    this.router.navigate(['/detail', id]);
    

  }
 
}
