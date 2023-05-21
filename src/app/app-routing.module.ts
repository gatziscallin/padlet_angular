import {RouterModule, Routes} from "@angular/router";
import {PadletListComponent} from "./padlet-list/padlet-list.component";
import {PadletDetailsComponent} from "./padlet-details/padlet-details.component";
import {NgModule} from "@angular/core";
import {PadletFormComponent} from "./padlet-form/padlet-form.component";
import {EntrieFormComponent} from "./entrie-form/entrie-form.component";
import {LoginComponent} from "./login/login.component";
import {CanNavigateToAdminGuard} from "./can-navigate-to-admin.guard";

const routes: Routes = [
  { path: '', redirectTo: 'padlets', pathMatch: 'full' },
  { path: 'padlets', component: PadletListComponent },
  { path: 'padlets/:id', component: PadletDetailsComponent },
  { path: 'admin', component: PadletFormComponent, canActivate:[CanNavigateToAdminGuard] }, //guard geschütze Route
  { path: 'admin/:id', component: PadletFormComponent, canActivate:[CanNavigateToAdminGuard] },
  { path: 'admin/padlets/:padlet_id/entries', component: EntrieFormComponent, canActivate:[CanNavigateToAdminGuard] },
  { path: 'admin/padlets/:padlet_id/entries/:id', component: EntrieFormComponent, canActivate:[CanNavigateToAdminGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanNavigateToAdminGuard]
})
export class AppRoutingModule { }
