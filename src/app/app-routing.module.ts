import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableViewComponent } from './table-view/table-view.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { HomeComponent } from './home/home.component';
import { WishlistComponent } from './wishlist/wishlist.component.spec';
import { DocumentationComponent } from './documentation/documentation.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'table', component: TableViewComponent },
  { path: 'detail/:id', component: DetailViewComponent },
  { path:'wishlist', component:WishlistComponent},
  { path:'documentation', component:DocumentationComponent}
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}