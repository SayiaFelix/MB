import { CreateUserComponent } from './../create-user/create-user.component';
import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/modules/shared/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ViewUserComponent } from '../view-user/view-user.component';
import { LabelBooleanComponent } from 'src/app/modules/shared/components/label-boolean/label-boolean.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [DatePipe]
})
export class UsersListComponent implements OnInit {
  @Input() data;
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
       { name: 'resetpass', title: '<span class="btn btn-success">Reset Pass</span>' },
        { name: 'editrecord', title: '&nbsp;&nbsp;<span class="btn  btn-primary btn-sm">Edit</span>' }
      ],
      position: 'right'
    },
    delete: {
      deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {
      username: {
        title: 'Username',
        type: 'string'
      },
      email: {
        title: 'Email Address',
        type: 'string'
      },
      is_active: {
        title: 'Is Active',
        type: 'custom',
        renderComponent: LabelBooleanComponent
      },
      //is_deleted: {
      //   title: 'Is Deleted',
      //   type: 'custom',
      //   renderComponent: LabelBooleanComponent
      // },
      created_at: {
        title: 'Created On',
        type: 'string',
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          const formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted;
        }
      }
      // last_login: {
      //   title: 'Last Login',
      //   type: 'string',
      //   valuePrepareFunction: (date) => {
      //     const raw = new Date(date);
      //     const formatted = this.datePipe.transform(raw, 'dd MMM yyyy hh:mm:ss');
      //     return formatted;
      //   },
      // },
      // last_password_change: {
      //   title: 'Last Credentials Change',
      //   type: 'string',
      //   valuePrepareFunction: (date) => {
      //     const raw = new Date(date);
      //     const formatted = this.datePipe.transform(raw, 'dd MMM yyyy hh:mm:ss');
      //     return formatted;
      //   },
      // },
      // status: {
      //   title: 'Status',
      //   type: 'string'
      // },
    },
    pager: {
      display: true,
      perPage: 10
    }
  };
  dataSet: any;
  constructor(private _httpService: HttpService, private modalService: NgbModal,
    public datePipe: DatePipe, public toastrService: ToastrService) { }
  ngOnInit() {
    this.loadData();
  }
  private loadData(): any {
    this._httpService.get('user/users').subscribe(
      result => {
        if (result.response.code === 200) {
          this.dataSet = result.data.map(obj => {
            return obj;
          });
        } else {
        }
      }
    );
  }
  public openModal(parentData: any) {
    this.modalRef = this.modalService.open(CreateUserComponent);
    this.modalRef.componentInstance.title = 'Add User';
    this.modalRef.componentInstance.parentData = '';
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadData();
      }
    });
  }
  public editRecord(formData: any) {
    this.modalRef = this.modalService.open(CreateUserComponent);
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
    this.modalRef = this.modalService.open(ViewUserComponent);
    this.modalRef.componentInstance.formData = formData;
    this.modalRef.result.then((result) => {
      if (result === 'success') {
      }
    });
  }

  onCustomAction(event) {
    switch (event.action) {
      case 'resetpass':
        this.resetUserPassword(event.data);
        break;
      case 'editrecord':
        this.editRecord(event.data);
    }
  }

  public resetUserPassword(data) {

    if (window.confirm('Are you sure want to reset the users password?')) {
    let model = {
      email_address: data.email
    }
    this._httpService.post('user/reset-user-password', model).subscribe(
      result => {
        if (result.response.code === 200) {
          //  window.confirm.resolve();
          this.toastrService.success('Password has been reset and sent to user: ' + data.email, 'Success!');
          data.is_active = 0;
          //  this.closeModal()
        } else {
          this.toastrService.error('Failed to Sent Password to user!', 'Failed');
        }

      })
    }else {
      // event.confirm.reject();
    }
  }
}
