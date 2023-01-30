import { AddRoleComponent } from './../add-role/add-role.component';
import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/modules/shared/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LabelBooleanComponent } from 'src/app/modules/shared/components/label-boolean/label-boolean.component';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss'],
  providers: [DatePipe]
})
export class RolesListComponent implements OnInit {
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
      { name: 'editRecord', title: '<i class="fa fa-pencil">Edit</i>' }
      ],
      position: 'right' // left|right
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {
      // role_type: {
      //   title: 'Type',
      //   type: 'string'
      // },
      name: {
        title: 'Role',
        type: 'string'
      },
      description: {
        title: 'Role Description',
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
      perPage: 50
    }
  };
  dataSet: any;
    constructor(private _httpService: HttpService, private modalService: NgbModal,
       public datePipe: DatePipe) { }
    ngOnInit() {
    this.loadData();
    }
    private loadData(): any {
      this._httpService.get('rbac/role').subscribe(
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
    public openModal(formData) {
      this.formData = formData;
      this.modalRef = this.modalService.open(AddRoleComponent);
      if (formData) {
        this.modalRef.componentInstance.title = 'Edit Role: ';
      } else {
        this.modalRef.componentInstance.title = 'Add Role';
      }
      this.modalRef.componentInstance.formData = this.formData;
      this.modalRef.result.then((result) => {
        if (result === 'success') {
          this.loadData();
        }
      });
    }
    public viewRecord($event) {
      this.modalRef = this.modalService.open(AddRoleComponent, { backdrop: 'static' });
      this.modalRef.componentInstance.companyData = $event.data;
      this.modalRef.result.then((result) => {
        if (result === 'success') {
          this.loadData();
        }
      });
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
}
