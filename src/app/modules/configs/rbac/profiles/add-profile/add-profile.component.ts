import { IMultiSelectSettings, IMultiSelectTexts, IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { HttpService } from 'src/app/modules/shared/services/http.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss']
})
export class AddProfileComponent implements OnInit {
  @Input() title;
  @Input() formData;
  public loading = false;
  public hasErrors = false;
  public errorMessages;
  public form: FormGroup;
  public assignedRolesModel: number[] = [];
  public assignedUsersModel: number[] = [];
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
  public roles: IMultiSelectOption[] = [];
  public users: IMultiSelectOption[] = [];
  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    private _httpService: HttpService,
    public toastrService: ToastrService) { }
  ngOnInit() {
    if(this.formData) {
    this.getAssignedRolesAndUsers();
    }
    this.loadRoles();
    this.loadUsers();
    this.form = this.fb.group({
      name: [this.formData ? this.formData.name : '', [Validators.required]],
      description: [this.formData ? this.formData.description : '', [Validators.nullValidator]],
      roles: [ '', [Validators.nullValidator]],
      users: [ '', [Validators.nullValidator]]
    });
  }
  public getAssignedRolesAndUsers(): void {
    this.assignedRolesModel = this.formData.roles.map((record) => {
      return record.role_id;
    });
    this.assignedUsersModel = this.formData.users.map((record) => {
      return record.user_id;
    });
   
  }
  public loadRoles(): void {
    this._httpService.get('rbac/role').subscribe(
      result => {
        if (result.response.code === 200) {
          this.roles = result.data;
        }
      }
    );
  }
  public loadUsers(): void {
    this._httpService.get('user/users').subscribe(
      result => {
        if (result.response.code === 200) {
          this.users = result.data;
          this.users = result.data.map(obj => {
            obj.name = obj.username;
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
    this._httpService.post('rbac/profile', this.form.value).subscribe(
      result => {
        if (result.response.code === 200) {
          this.toastrService.success('Awaiting approval!', 'Success!');
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
    this._httpService.put('rbac/profile/' + this.formData.id, this.form.value).subscribe(
      result => {
        if (result.response.code === 200) {
          this.toastrService.success('Changes saved successfully!', 'Saved Changes!');
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
    Object.entries(response.error_messages).forEach(
      ([key, value]) => 
        this.errorMessages.push(value)
    );
  }

  public closeModal(): void {
    this.activeModal.dismiss('Cross click');
  }

}
