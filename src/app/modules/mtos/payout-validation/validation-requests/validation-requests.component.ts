// tslint:disable:no-string-literal
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableService, TableResponseModel, ITableState, BaseModel, PaginatorState, SortState, GroupingState } from '../../../../_metronic/shared/crud-table';
// import {
//   GroupingState,
//   PaginatorState,
//   SortState,
//   IDeleteAction,
//   IDeleteSelectedAction,
//   IFetchSelectedAction,
//   IUpdateStatusForSelectedAction,
//   ISortView,
//   IFilterView,
//   IGroupingView,
//   ISearchView,
// } from '../../../../_metronic/shared/crud-table';
import { HttpService } from 'src/app/modules/shared/services/http.service';
@Component({
  selector: 'app-validation-requests',
  templateUrl: './validation-requests.component.html',
  styleUrls: ['./validation-requests.component.scss']
})
export class ValidationRequestsComponent implements OnInit {
 public data: any;
 public totalValue: number = 0;
 paginator: PaginatorState;
 sorting: SortState;
 grouping: GroupingState;
 isLoading: boolean;
 filterGroup: FormGroup;
 searchGroup: FormGroup;
  constructor(private httpService: HttpService) {
    this.grouping = new GroupingState();
    this.sorting = new  SortState();
    this.paginator = new PaginatorState();
   }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(): void {
    this.httpService.get('mto/validations').subscribe((res) => {
      this.data = res.data;
      this.totalValue = this.data.reduce((sum, li) => sum + li.money_transfer_amount, 0);
    });

  }
 // sorting
 sort(column: string) {
  const sorting = this.sorting;
  const isActiveColumn = sorting.column === column;
  if (!isActiveColumn) {
    sorting.column = column;
    sorting.direction = 'asc';
  } else {
    sorting.direction = sorting.direction === 'asc' ? 'desc' : 'asc';
  }
//  this.customerService.patchState({ sorting });
}

// pagination
paginate(paginator: PaginatorState) {
  
  console.log(this.paginator)
 // this.customerService.patchState({ paginator });
}

}
