import { ViewAuditTrailComponent } from './../view-audit-trail/view-audit-trail.component';

import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/modules/shared/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-audit-trail-list',
  templateUrl: './audit-trail-list.component.html',
  styleUrls: ['./audit-trail-list.component.scss'],
  providers: [DatePipe]
})
export class AuditTrailListComponent implements OnInit {
  public settings: any;
  bsRangeValue: any;
  startEndDate: any;
  username: string;
  loading: boolean = false;
  defaultRowPerPage: number = 5;
  users: any = [];
  @Input() data;
  public formData;
  public modalRef: NgbModalRef;
 
  dataSet: any;
  constructor(private _httpService: HttpService, private modalService: NgbModal,
    public datePipe: DatePipe, public toastrService: ToastrService) { 
      this.bsRangeValue= [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
    }
  ngOnInit() {
    this.loadData();
    this.loadUsers();
  }
  private loadData(): any {
    this.settings =  {
      selectMode: 'single',  // single|multi
      hideHeader: false,
      hideSubHeader: false,
      actions: {
        columnTitle: 'Actions',
        add: false,
        edit: false,
        delete: false,
        custom: [
          { name: 'viewrecord', title: '<i class="fa fa-eye"></i>' }
        ],
        position: 'right'
      },
      delete: {
        deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
        confirmDelete: true
      },
      noDataMessage: 'No data found',
      columns: {
        // created_at: {
        //   title: 'Timestamp',
        //   type: 'string'
        // },
        username: {
          title: 'Username',
          type: 'string'
        },
        action: {
          title: 'Action Name',
          type: 'string'
        },
      
        ip: {
          title: 'IP Address',
          type: 'string'
        },
        url: {
          title: 'URL Path',
          type: 'string'
        },
        user_agent: {
          title: 'User Agent',
          type: 'string'
        },
      created_at: {
          title: 'Date Time',
          type: 'string',
          valuePrepareFunction: (date) => {
            const raw = new Date(date);
            const formatted = this.datePipe.transform(raw, 'dd MMM yyyy hh:mm:ss a');
            return formatted;
          }
        }
  
      },
      pager: {
        display: true,
        perPage: this.defaultRowPerPage
      }
    };
    let model = {
      "startDate" : moment(this.bsRangeValue[0]).format('YYYY-MM-DD'),
      "endDate" : moment(this.bsRangeValue[1]).format('YYYY-MM-DD'),
      "username": this.username
    };
    this._httpService.post('user/trail', model).subscribe(
      result => {
        if (result.response.code === 200) {
          this.dataSet = result.data.map(obj => {
            return obj;
          });
        } else {
        }
      },
      error => {
      },
      complete => {
      }
    );
  }
  public openModal(parentData: any) {
  //  this.modalRef = this.modalService.open(CreateUserComponent);
    this.modalRef.componentInstance.title = 'Add User';
    this.modalRef.componentInstance.parentData = '';
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadData();
      }
    });
  }
  public editRecord(formData: any) {
  //  this.modalRef = this.modalService.open(CreateUserComponent);
    this.modalRef.componentInstance.formData = formData;
    this.modalRef.componentInstance.title = 'Edit User: ' + formData.username;
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadData();
      }
    });
  }
  public onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this._httpService.delete('profile/' + event.data.id).subscribe(
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
  public viewRecord(formData: any) {
    this.modalRef = this.modalService.open(ViewAuditTrailComponent);
    this.modalRef.componentInstance.formData = formData;
    this.modalRef.result.then((result) => {
      if (result === 'success') {
      }
    });
  }

  onCustomAction(event) {
    switch (event.action) {
      case 'viewrecord':
        this.viewRecord(event.data);
        break;
      case 'editrecord':
        this.editRecord(event.data);
    }
  }

  loadUsers(): any {
    this._httpService.get('user/users').subscribe(
      result => {
        if (result.response.code === 200) {
          this.users = result.data.map(obj => {
            return obj;
          });
        } else {
        }
      },
      error => {
      },
      complete => {
      }
    );
  }
  public applyFilters(): void {
    this.loadData();
  }
  public clearFilters(): void {
    this.bsRangeValue= [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
     this.username ='';
     this.defaultRowPerPage = 5;
    this.loadData();
  }
}
