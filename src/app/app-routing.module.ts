import {RouterModule, Routes} from "@angular/router";
import {PadletListComponent} from "./padlet-list/padlet-list.component";
import {PadletDetailsComponent} from "./padlet-details/padlet-details.component";
import {NgModule} from "@angular/core";
import {PadletFormComponent} from "./padlet-form/padlet-form.component";
import {EntrieFormComponent} from "./entrie-form/entrie-form.component";
import {LoginComponent} from "./login/login.component";
import {CanNavigateToAdminGuard} from "./can-navigate-to-admin.guard";
import {CommentFormComponent} from "./comment-form/comment-form.component";
import {RatingFormComponent} from "./rating-form/rating-form.component";

const routes: Routes = [
  // Home - wird redirectet zu /padlets
  { path: '', redirectTo: 'padlets', pathMatch: 'full' },

  // Startseite mit der Padletliste
  { path: 'padlets', component: PadletListComponent },

  // Ein bestimmtes Padlet mit seinen Einträgen und Comments/Ratings
  { path: 'padlets/:id', component: PadletDetailsComponent },

  // Neues Padlet anlegen - durch Guard geschützte Route
  { path: 'admin', component: PadletFormComponent, canActivate:[CanNavigateToAdminGuard] },

  // Padlet bearbeiten - durch Guard geschützte Route
  { path: 'admin/:id', component: PadletFormComponent, canActivate:[CanNavigateToAdminGuard] },

  // Neuen Eintrag anlegen - durch Guard geschützte Route
  { path: 'admin/padlets/:padlet_id/entries', component: EntrieFormComponent, canActivate:[CanNavigateToAdminGuard] },

  // Eintrag bearbeiten - durch Guard geschützte Route
  { path: 'admin/padlets/:padlet_id/entries/:id', component: EntrieFormComponent, canActivate:[CanNavigateToAdminGuard] },

  // Neuen Kommentar anlegen - durch Guard geschützte Route
  { path: 'admin/padlets/:padlet_id/entries/:entrie_id/comments', component: CommentFormComponent, canActivate:[CanNavigateToAdminGuard] },

  // Neues Rating anlegen - durch Guard geschützte Route
  { path: 'admin/padlets/:padlet_id/entries/:entrie_id/ratings', component: RatingFormComponent, canActivate:[CanNavigateToAdminGuard] },

  // Login
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanNavigateToAdminGuard]
})
export class AppRoutingModule { }
