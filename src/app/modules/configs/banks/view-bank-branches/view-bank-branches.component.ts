import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/modules/shared/services/http.service';

@Component({
  selector: 'app-view-bank-branches',
  templateUrl: './view-bank-branches.component.html',
  styleUrls: ['./view-bank-branches.component.scss']
})
export class ViewBankBranchesComponent implements OnInit {
  public _parameters: any;
  public _id: any;
  public data: any;
  constructor(private _activatedRoute: ActivatedRoute, private _httpService: HttpService) { }

  ngOnInit() {
    this._parameters = this._activatedRoute.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this._id = params['id'];
      }
    });
    this.loadData();
  }
  private loadData(): void {
    this._httpService.get('configs/bank/' + this._id).subscribe(
      result => {
        if (result.response.code === 200) {
          this.data = result.data;
        } else {
        }
      }
    );
  }
}
