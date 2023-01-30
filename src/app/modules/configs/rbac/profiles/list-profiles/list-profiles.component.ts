import { ViewProfileComponent } from './../view-profile/view-profile.component';
import { AddProfileComponent } from './../add-profile/add-profile.component';
import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/modules/shared/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LabelBooleanComponent } from 'src/app/modules/shared/components/label-boolean/label-boolean.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-profiles',
  templateUrl: './list-profiles.component.html',
  styleUrls: ['./list-profiles.component.scss'],
  providers: [DatePipe]
})
export class ListProfilesComponent implements OnInit {
  @Input() data;
  public formData;
  public modalRef: NgbModalRef;
  private subscriptions: Subscription[] = [];
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
        // { name: 'viewrecord', title: '<i class="fa fa-eye"></i>' },
        { name: 'editrecord', title: '&nbsp;&nbsp;<i class="btn btn-primary btn-sm">View / Edit</btn>' }
      ],
      position: 'right'
    },
    delete: {
      deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {
      name: {
        title: 'Profile',
        type: 'string'
      },
      description: {
        title: 'Description',
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
          const raw = new Date(date);
          const formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted;
        }
      }
    },
    pager: {
      display: true,
      perPage: 5
    }
  };
  dataSet: any;
  constructor(private _httpService: HttpService, private modalService: NgbModal,
    public datePipe: DatePipe, public toastrService: ToastrService) { }
  ngOnInit() {
    this.loadData();
  }
  private loadData(): any {
   let subscr = this._httpService.get('rbac/profile').subscribe(
      result => {
        if (result.response.code === 200) {
          this.dataSet = result.data.map(obj => {
            return obj;
          });
        } else {
        }
      }
    );
    this.subscriptions.push(subscr)
  }
  public openModal(parentData: any) {
    this.modalRef = this.modalService.open(AddProfileComponent);
    this.modalRef.componentInstance.title = 'Add Profile';
    this.modalRef.componentInstance.parentData = parentData;
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadData();
      }
    });
  }
  public editRecord(formData: any) {
    this.modalRef = this.modalService.open(AddProfileComponent);
    this.modalRef.componentInstance.formData = formData;
    this.modalRef.componentInstance.title = 'View / Edit Profile: ';
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
    this.modalRef = this.modalService.open(ViewProfileComponent);
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

}
