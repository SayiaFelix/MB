import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/modules/shared/services/http.service';
import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal , NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AddCountryComponent } from '../add-country/add-country.component';

@Component({
  selector: 'app-conf-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
  providers: [DatePipe]
})
export class CountriesListComponent implements OnInit {
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
      { name: 'editRecord', title: '<i class="fa fa-pencil"></i>&nbsp;&nbsp;' }],
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
      country_code: {
        title: 'Country Code',
        type: 'string'
      },
      created_on: {
        title: 'System Date',
        type: 'string'
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
    this._httpService.get('countries/show').subscribe(
      result => {
        if (result.response.response_status.response_code === 200) {
          this.dataSet = result.response.data;
        } else {
        }
      },
      error => {
      },
      complete => {
      }
    );
  }
  public openModal(formData) {
    this.formData = formData;
    this.modalRef = this.modalService.open(AddCountryComponent);
    if (formData) {
      this.modalRef.componentInstance.title = 'Edit Country Details ';
    } else {
      this.modalRef.componentInstance.title = 'Add Country';
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
        break;
      case 'editRecord':
        this.openModal(event.data);
        break;
      default:
        break;
    }
  }

}
