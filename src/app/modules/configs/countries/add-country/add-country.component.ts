import { HttpService } from 'src/app/modules/shared/services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-countrty',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})
export class AddCountryComponent implements OnInit {
  @Input() title;
  @Input() formData;
  public loading = false;
  public hasErrors = false;
  public errorMessages;
  public form: FormGroup;
  public countries;
  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    private _httpService: HttpService,
    public toastrService: ToastrService) { }
  ngOnInit() {
    this.form = this.fb.group({
      name: [this.formData ? this.formData.name : '', Validators.compose([Validators.required])],
      country_code: [this.formData ? this.formData.country_code : '', Validators.compose([Validators.required])]

    });
  }
  public submitData(): void {
    this.loading = true;
    this._httpService.post('countries/create', this.form.value).subscribe(
      result => {
        if (result.response.response_status.response_code === 201) {
          this.toastrService.success('Record created successfully!', 'Created Successfully!');
          this.activeModal.close('success');
        } else {
          this.handleErrorsFromServer(result);
        }
      },
      error => {
        this.errorMessages = error.error.error_messages;
      },
      complete => {
        this.loading = false;
      }

    );
  }
  public saveChanges(): void {
    this.loading = true;
    this.form.value.id = this.formData.id;
    this._httpService.post('countries/update', this.form.value).subscribe(
      result => {
        if (result.response.response_code === 200) {
          this.toastrService.success('Changes saved!', 'Saved Successfully!');
          this.activeModal.close('success');
        } else {
          this.handleErrorsFromServer(result);
        }
      },
      error => {
        this.errorMessages = error.error.error_messages;
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
    Object.entries(response.error_messages).forEach(
      ([key, value]) =>
        this.errorMessages.push(value)
    );
  }

  public closeModal(): void {
    this.activeModal.dismiss('Cross click');
  }
 private loadCountries(): void {
  this._httpService.get('countries/show').subscribe(
    result => {
      if (result.response.response_status.response_code === 200) {
        this.countries = result.response.data;
      } else {
      }
    },
    error => {
    },
    complete => {
    }
  );
 }

}
