import { AddRoleComponent } from './rbac/roles/add-role/add-role.component';
import { RolesListComponent } from './rbac/roles/roles-list/roles-list.component';


import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfigsRoutingModule } from './configs-routing';
import { SharedModule } from '../shared/shared.module';
import { CountriesListComponent } from './countries/countries-list/countries-list.component';
import { AddCountryComponent } from './countries/add-country/add-country.component';

import { ListProfilesComponent } from './rbac/profiles/list-profiles/list-profiles.component';
import { AddProfileComponent } from './rbac/profiles/add-profile/add-profile.component';
import { ViewProfileComponent } from './rbac/profiles/view-profile/view-profile.component';
import { ListBranchesComponent } from './branches/list-branches/list-branches.component';
import { ListBanksComponent } from './banks/list-banks/list-banks.component';
import { CreateBankComponent } from './banks/create-bank/create-bank.component';
import { ViewBankBranchesComponent } from './banks/view-bank-branches/view-bank-branches.component';
import { CreateBankBranchComponent } from './banks/create-bank-branch/create-bank-branch.component';
import { ListBankBranchesComponent } from './banks/list-bank-branches/list-bank-branches.component';

// import { AddPatientComponent } from './add-patient/add-patient.component';

@NgModule({
  imports: [
    SharedModule,
    ConfigsRoutingModule,
    ModalModule.forRoot()
  ],
  declarations: [
    CountriesListComponent,
    AddCountryComponent,
 
    RolesListComponent,
    AddRoleComponent,
    ListProfilesComponent,
    AddProfileComponent,
    ViewProfileComponent,

    ListBranchesComponent,
    ListBanksComponent,
    CreateBankComponent,
    ViewBankBranchesComponent,
    CreateBankBranchComponent,
    ListBankBranchesComponent
  ],
  entryComponents: [
    AddCountryComponent,
 
    AddRoleComponent,
    AddProfileComponent,
    ViewProfileComponent,
  
    CreateBankComponent,
    CreateBankBranchComponent
  ]
})
export class ConfigsModule { }

