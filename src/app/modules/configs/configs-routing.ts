
import { ListProfilesComponent } from './rbac/profiles/list-profiles/list-profiles.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesListComponent } from './countries/countries-list/countries-list.component';
import { RolesListComponent } from './rbac/roles/roles-list/roles-list.component';
import { ListBranchesComponent } from './branches/list-branches/list-branches.component';
import { ListBanksComponent } from './banks/list-banks/list-banks.component';
import { ViewBankBranchesComponent } from './banks/view-bank-branches/view-bank-branches.component';
const routes: Routes = [
    {
        path: 'countries',
        component: CountriesListComponent,
        data: {
            breadcrumb: 'Countries',
            title: 'Countries'
        }
    },
    {
        path: 'branches',
        component: ListBranchesComponent,
        data: {
            breadcrumb: 'Kephis Branches',
            title: 'Branches'
        }
    },
    

    {
        path: 'rbac/roles',
        component: RolesListComponent,
        data: {
            breadcrumb: 'Roles',
            title: 'Roles'
        }
    },
    {
        path: 'rbac/profiles',
        component: ListProfilesComponent,
        data: {
            breadcrumb: 'Profiles',
            title: 'Profiles'
        }
    },
   
    {
        path: 'banks',
        component: ListBanksComponent,
        data: {
            breadcrumb: 'Banks',
            title: 'Banks'
        }
    },
    {
        path: 'bank-branches',
        children: [
            {
                path: ':id',
                component: ViewBankBranchesComponent,
                data: {
                    breadcrumb: 'Bank Branch',
                    title: 'Bank Branch'
                }
            }
        ]

    }
];

export const ConfigsRoutingModule: ModuleWithProviders<any>  = RouterModule.forChild(routes);
