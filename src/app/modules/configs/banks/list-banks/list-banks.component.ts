import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/modules/shared/services/http.service';
import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LabelBooleanComponent } from 'src/app/modules/shared/components/label-boolean/label-boolean.component';
import { CreateBankComponent } from '../create-bank/create-bank.component';


@Component({
  selector: 'app-list-banks',
  templateUrl: './list-banks.component.html',
  styleUrls: ['./list-banks.component.scss'],
  providers: [DatePipe]
})
export class ListBanksComponent implements OnInit {
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
        { name: 'viewRecord', title: '<div class="btn btn-sm btn-primary">Branches</div></br>' },
        { name: 'editRecord', title: '<div class="btn btn-sm btn-success">Edit</div>' }],
      position: 'right' // left|right
    },
    delete: {
      deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {
      name: {
        title: 'Name',
        type: 'string'
      },
      bank_code: {
        title: 'Bank Code',
        type: 'string'
      },
      swift_code: {
        title: 'Swift Code',
        type: 'string'
      },
      is_active: {
        title: 'Is Active',
        type: 'custom',
        renderComponent: LabelBooleanComponent
      },
      
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
      perPage: 20
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
    this._httpService.get('configs/banks').subscribe(
      result => {
        if (result.response.code === 200) {
          this.dataSet = result.data;
        } else {
        }
      }
    );
  }
  public openModal(formData?) {
    this.formData = formData;
  this.modalRef = this.modalService.open(CreateBankComponent);
    if (formData) {
      this.modalRef.componentInstance.title = 'Edit Bank Info ';
    } else {
      this.modalRef.componentInstance.title = 'Create Bank';
    }
    this.modalRef.componentInstance.formData = this.formData;
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
        this.viewRecord(event.data);
        break;
      case 'editRecord':
        this.openModal(event.data);
        break;
      default:
        break;
    }
  }

  private viewRecord(data: any) {
    this.router.navigate(['configs/bank-branches', data.id]);
  }

}



