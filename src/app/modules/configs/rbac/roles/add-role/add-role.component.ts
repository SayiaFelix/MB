import { HttpService } from 'src/app/modules/shared/services/http.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
  @Input() title;
  @Input() formData;
  public loading = false;
  public hasErrors = false;
  public errorMessages;
  public form: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    private _httpService: HttpService,
    public toastrService: ToastrService) { }
   ngOnInit() {
    this.form = this.fb.group({
      name: [this.formData ? this.formData.name : '', [Validators.required]],
      description: [this.formData ? this.formData.description : '', [Validators.required]],
      is_active: [this.formData ? (this.formData.is_active ? "1": "0") : '1', [Validators.nullValidator]]
    });
  }
  public submitData(): void {
    if (this.formData) {
     this.saveChanges();
    } else {
      this.createRecord();
    }
    this.loading = true;
  }
  private createRecord(): any {
    this._httpService.post('rbac/role', this.form.value).subscribe(
      result => {
        if (result.response && result.response.code === 200) {
          this.toastrService.success('Record created successfully!', 'Created Successfully!');
          this.activeModal.close('success');
        } else {
          this.handleErrorsFromServer(result);
        }
      },
      error => {
      },
      complete => {
        this.loading = false;
      }

    );
  }
  private saveChanges(): any {
    this._httpService.patch('rbac/role/' + this.formData.id, this.form.value).subscribe(
      result => {
        if (result.response.code === 200) {
          this.toastrService.success('Changes saved successfully!', 'Saved Changes!');
          this.activeModal.close('success');
        } else {
          this.handleErrorsFromServer(result);
        }
      },
      error => {
      //  this.errorMessages = error.error.error_messages;
      },
      complete => {
        this.loading = false;
      }

    );
  }
  public handleErrorsFromServer(response: any) {

    this.loading = false;
    this.hasErrors = true;
    this.errorMessages = [];
    response.forEach(
     (rec) => 
     
      this.errorMessages.push(rec.message)
    );
  }

  public closeModal(): void {
    this.activeModal.dismiss('Cross click');
  }

}
