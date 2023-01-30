import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-audit-trail',
  templateUrl: './view-audit-trail.component.html',
  styleUrls: ['./view-audit-trail.component.scss']
})
export class ViewAuditTrailComponent implements OnInit {
  @Input() formData;
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log(this.formData);
  }
  public closeModal(): void {
    this.activeModal.dismiss('Cross click');
  }
}
