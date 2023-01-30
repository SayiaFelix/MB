import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/modules/shared/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModalRef, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LabelBooleanComponent } from 'src/app/modules/shared/components/label-boolean/label-boolean.component';
import { CreateBankBranchComponent } from '../create-bank-branch/create-bank-branch.component';

@Component({
  selector: 'app-list-bank-branches',
  templateUrl: './list-bank-branches.component.html',
  styleUrls: ['./list-bank-branches.component.scss'],
  providers: [DatePipe]
})
export class ListBankBranchesComponent implements OnInit {
  @Input() bankData;
  public formData;
  public modalRef: NgbModalRef;
  public settings = {
    selectMode: 'single',  // single|multi
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'editRecord', title: 'Edit Branch' }
      ],
      position: 'right' // left|right
    },
    delete: {
      deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {
      name: {
        title: 'Branch Name',
        type: 'string'
      },
      branch_code: {
        title: 'Branch Code',
        type: 'string'
      },
      is_active: {
        title: 'Is Active',
        type: 'custom',
        renderComponent: LabelBooleanComponent
      },
      // is_deleted: {
      //   title: 'Is Deleted',
      //   type: 'custom',
      //   renderComponent: LabelBooleanComponent
      // },
      created_at: {
        title: 'Created On',
        type: 'string',
       valuePrepareFunction: (date) => {
         // const raw = new Date(date);
         // const formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return date;
        }
      }
    },
    pager: {
      display: true,
      perPage: 10
    }
  };
  dataSet: any;
  constructor(config: NgbModalConfig, private _httpService: HttpService, private modalService: NgbModal, private router: Router,
    public datePipe: DatePipe, public toastrService: ToastrService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit() {
    this.loadData();
  }
  private loadData(): any {
    this._httpService.get('configs/banks/' + this.bankData.id).subscribe(
      result => {
        if (result.response.code === 200) {
          this.dataSet = result.data;
        }
      }
    );
  }
  public openModal(formData?) {
    this.modalRef = this.modalService.open(CreateBankBranchComponent);
    this.modalRef.componentInstance.title = 'Add Branch ';
    if (formData) {
      this.modalRef.componentInstance.title = 'Edit Branch ';
    }
    this.modalRef.componentInstance.formData = formData;
    this.modalRef.componentInstance.bankData = this.bankData;
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadData();
      }
    });
  }


  public onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this._httpService.delete('developers/' + event.data.id).subscribe(
        result => {
          if (result.response_code === 200) {
            event.confirm.resolve();
            this.toastrService.success(event.data.id, 'Deleted!');
          } else {
            this.toastrService.error(event.data.id, 'Failed to Delete!');
          }
        }
      );
    } else {
      event.confirm.reject();
    }
  }


  public onCustomAction(event: any): void {
    switch (event.action) {
      case 'viewRecord':
        break;
      case 'editRecord':
        this.openModal(event.data);
        break;
      default:
        break;
    }
  }

}

