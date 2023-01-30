import { IMultiSelectSettings, IMultiSelectTexts, IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { HttpService } from 'src/app/modules/shared/services/http.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  @Input() title;
  @Input() formData;
  public loading = false;
  public hasErrors = false;
  public errorMessages;
  public form: FormGroup;
  public assignedProfilesModel: number[] = [];
  public thirdControlSettings: IMultiSelectSettings = {
      enableSearch: true,
      checkedStyle: 'checkboxes',
      buttonClasses: 'btn btn-secondary btn-block',
      dynamicTitleMaxItems: 3,
      displayAllSelectedText: true,
      showCheckAll: true,
      showUncheckAll: true
  };
  public thirdControlTexts: IMultiSelectTexts = {
      checkAll: 'Select all',
      uncheckAll: 'Unselect all',
      checked: 'item selected',
      checkedPlural: 'items selected',
      searchPlaceholder: 'Find...',
      defaultTitle: 'Select Item(s)',
      allSelected: 'All selected'
  };
  public profiles: IMultiSelectOption[] = [];
  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    private _httpService: HttpService,
    public toastrService: ToastrService) { }
  ngOnInit() {
   
    this.loadProfiles();
    this.form = this.fb.group({
      email_address: [this.formData ? this.formData.email : '', [Validators.required, Validators.email]],
      // first_name: [this.formData ? this.formData.first_name : '', [Validators.nullValidator]],
      // middle_name: [this.formData ? this.formData.middle_name : '', [Validators.nullValidator]],
      // surname: [this.formData ? this.formData.surname : '', [Validators.nullValidator]],
      profiles: [ '', [Validators.required]],
   is_active: [this.formData ? (this.formData.is_active ? "1": "0") : '1', [Validators.nullValidator]]
    });
    if(this.formData.profiles) {
      this.assignedProfilesModel = this.formData.profiles.map((rec) => {
        return rec.profile_id;
      });
    }
  }
  public loadProfiles(): void {
    this._httpService.get('rbac/profile').subscribe(
      result => {
        if (result.response.code === 200) {
          this.profiles = result.data;
          this.profiles = result.data.map(obj => {
          // obj.name = obj.profile_name;
            return obj;
          });
        }
      }
    );
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
    this.form.value.email = this.form.value.email_address;
    this.form.value.username = this.form.value.email_address;
    this._httpService.post('user/users', this.form.value).subscribe(
      result => {
        if (result.response.code === 200) {
          this.toastrService.success(result.response.description, 'Success!');
          this.activeModal.close('success');
        } else {
          this.handleErrorsFromServer(result.data);
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
  private saveChanges(): any {
    this._httpService.patch('user/user/' + this.formData.id, this.form.value).subscribe(
      result => {
        if (result.response.code === 200) {
          this.toastrService.success(result.response.description, 'Success!');
          this.activeModal.close('success');
        } else {
          this.handleErrorsFromServer(result.data);
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
    Object.entries(response).forEach(
      ([key, value]) => // console.log(key, value)
        this.errorMessages.push(value)
    );
  }

  public closeModal(): void {
    this.activeModal.dismiss('Cross click');
  }
}
