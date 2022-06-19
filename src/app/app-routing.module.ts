import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [ {
  path: 'history',
  component: HistoryComponent,
  data: { title: 'Hacker News Search History' }
},
{
  path: 'search',
  component: SearchComponent,
  data: { title: 'Hacker News Search' }
},
{ path: '',
  redirectTo: '/search',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
