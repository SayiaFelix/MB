import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-tx-status',
  templateUrl: './tx-status.component.html',
  styleUrls: ['./tx-status.component.scss']
})
export class TxStatusComponent implements OnInit, ViewCell {
  label: any;
  labelClass: string;
  renderValue: string;
  @Input() value: any;
  @Input() rowData: any;
  constructor() {

   }

  ngOnInit() {
    this.value = this.value ? this.value.trim() : '';
    if (this.value == "00") {
      this.label = 'Success';
      this.labelClass = 'badge badge-success mr-1';
    } else {
      this.label = 'Failed';
      this.labelClass = 'badge badge-danger mr-1';
    }
    this.renderValue =  this.value.toString().toUpperCase() ;
  }

}
