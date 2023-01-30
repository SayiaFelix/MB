
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableService, TableResponseModel, ITableState, BaseModel, PaginatorState, SortState, GroupingState } from '../../../_metronic/shared/crud-table';

import { HttpService } from 'src/app/modules/shared/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-successful-momo-transactions',
  templateUrl: './successful-momo-transactions.component.html',
  styleUrls: ['./successful-momo-transactions.component.scss']
})
export class SuccessfulMomoTransactionsComponent implements OnInit {
  public data: any;
  public totalValue: number = 0;
  public file: any;
  public fileIsSelected: boolean = false;
  paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  constructor(private httpService: HttpService ,private router: Router) {
    this.grouping = new GroupingState();
    this.sorting = new SortState();
    this.paginator = new PaginatorState();
  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(): void {
    //  this.httpService.get('mto/validations').subscribe((res) => {
    this.data = [
      { created_on: '07-07-2021', momo: 'Tigo Cash', transaction_ref: 'XY892374ZBU', momo_transaction_ref: 'XY892374ZBU', customer_no: '+233783933', amount: '5,800' , passed: true },
      { created_on: '07-07-2021', momo: 'MTN MoMo', transaction_ref: 'ZY892774ZBT', momo_transaction_ref: 'Y89892374ZB', customer_no: '+233183900', amount: '3,600' , passed: true },
    //  { created_on: '07-07-2021', momo: 'Airtel Money', transaction_ref: 'AY892774ZPO', momo_transaction_ref: 'A89892374ZC', customer_no: '+233193911', amount: '3,800', passed: false  },
      { created_on: '07-07-2021', momo: 'Vodafone Cash', transaction_ref: 'ZY892774ZBT', momo_transaction_ref: 'Y89892374ZB', customer_no: '+233183900', amount: '23,900', passed: true  },
      { created_on: '07-07-2021', momo: 'MTN MoMo', transaction_ref: 'ZY892774ZBT', momo_transaction_ref: 'Y89892374ZB', customer_no: '+233183900', amount: '3,600' , passed: true },
     // { created_on: '07-07-2021', momo: 'Airtel Money', transaction_ref: 'AY892774ZPO', momo_transaction_ref: 'A89892374ZC', customer_no: '+233193911', amount: '3,800', passed: false  },
      { created_on: '07-07-2021', momo: 'Tigo Cash', transaction_ref: 'XY892374ZBU', momo_transaction_ref: 'XY892374ZBU', customer_no: '+233783933', amount: '5,800', passed: true  },
      { created_on: '07-07-2021', momo: 'MTN MoMo', transaction_ref: 'ZY892774ZBT', momo_transaction_ref: 'Y89892374ZB', customer_no: '+233183900', amount: '3,600', passed: true  },
      { created_on: '07-07-2021', momo: 'Airtel Money', transaction_ref: 'AY892774ZPO', momo_transaction_ref: 'A89892374ZC', customer_no: '+233193911', amount: '3,800', passed: true  },
     // { created_on: '07-07-2021', momo: 'Vodafone Cash', transaction_ref: 'ZY892774ZBT', momo_transaction_ref: 'Y89892374ZB', customer_no: '+233183900', amount: '23,900', passed: false  },
      { created_on: '07-07-2021', momo: 'Vodafone Cash', transaction_ref: 'ZY892774ZBT', momo_transaction_ref: 'Y89892374ZB', customer_no: '+233183900', amount: '23,900', passed: true  },
      { created_on: '07-07-2021', momo: 'MTN MoMo', transaction_ref: 'ZY892774ZBT', momo_transaction_ref: 'Y89892374ZB', customer_no: '+233183900', amount: '3,600', passed: true  },
      { created_on: '07-07-2021', momo: 'Airtel Money', transaction_ref: 'AY892774ZPO', momo_transaction_ref: 'A89892374ZC', customer_no: '+233193911', amount: '3,800', passed: true  }
    ];
    // this.totalValue = this.data.reduce((sum, li) => sum + li.amount, 0);
    //  });

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
  }
  submit(): void {
    this.fileIsSelected = true;
  }
  onFileChange(evt): void {
    this.file = evt.target.files[0].name;
  }
  removeFile(): void {
    console.log(this.fileIsSelected)
    this.file = null;
    this.fileIsSelected = false;
  }
  processTxns(): void {
    this.router.navigateByUrl('/mtos/succesful-txns')
  }
}
