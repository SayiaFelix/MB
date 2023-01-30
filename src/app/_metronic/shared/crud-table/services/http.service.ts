import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
@Injectable(
  {
    providedIn: 'root'
  }
)
export class HttpService {
  private TOKEN: string;
  private API_END_POINT: string;
  constructor(
    private http: HttpClient
  ) {
    this.TOKEN = localStorage.getItem('token');
    this.API_END_POINT = environment.apiUrl;
  }
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      
    });
  }
  private getHeadersWithoutBearer(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
  public login(endpoint: any, model: any): any {
    return this.http.post(this.API_END_POINT + endpoint, model, { headers: this.getHeadersWithoutBearer() }
    ).pipe(map(response => {
      response = response;
      return response;
    }));
  }

  
  public post(endpoint: string, model: any): any {
    return this.http.post(this.API_END_POINT + endpoint, model
    ).pipe(map(response => {
      response = response;
      return response;
    }));
  } 
  public postMulti(endpoint: string, model: any): any {
    return this.http.post(this.API_END_POINT + endpoint, model
    ).pipe(map(response => {
      response = response;
      return response;
    }));
  } 
  public patch(endpoint: string, model: any, isMultiType?: false): any {
    return this.http.patch(this.API_END_POINT + endpoint, model, { headers: this.getHeaders() }
    ).pipe(map(response => {
      response = response;
      return response;
    }));
  }
  public put(endpoint: string, model: any): any {
    return this.http.put(this.API_END_POINT + endpoint, model, { headers: this.getHeaders() }
    ).pipe(map(response => {
      response = response;
      return response;
    }));
  }
  public get(endpoint: string, headerParams?: any): any {
    let params = new HttpParams();
    // params = params.append('page', '0');
    // params = params.append('size', '1000');
    return this.http.get(this.API_END_POINT + endpoint,
      {
        headers: this.getHeaders(), params: params
      }
    ).pipe(map(response => {
      response = response;
      return response;
    }));
  }
    public download(endpoint: string, headerParams?: any): any {
      console.log(endpoint)
    return this.http.get(endpoint, { responseType: 'blob', observe: 'response' }).pipe(map(response => {
      response = response;
      return response;
    }));
  }
  public delete(endpoint: string): any {
    return this.http.delete( endpoint
    ).pipe(map(response => {
      response = response;
      return response;
    }));
  }
  getFromJson(endpoint: string): any {
    return this.http.get(endpoint);
  }

  private handleError(error: Response | any) {
    let errorMessage: any = {};
    if (error.status === 0) {
      errorMessage = {
        success: false,
        status: 0,
        data: 'Sorry, there was a connection error occurred. Please try again.'
      };
    } else {
      errorMessage = error.json();
    }
    return Observable.throw(errorMessage);
  }

  format(date: NgbDateStruct, format: string): string {
    if (!date) { return ''; }
    const mdt = moment([date.year, date.month - 1, date.day]);
    if (!mdt.isValid()) { return ''; }
    return mdt.format(format);
  }

  public buildFormData(formData: any, data: any, parentKey: any): any {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
      Object.keys(data).forEach(key => {
        this.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {
      const value = data == null ? '' : data;
      formData.append(parentKey, value);
    }
  }
  public jsonToFormData(data: any): any {
    const formData = new FormData();
    this.buildFormData(formData, data, null);
    return formData;
  }
}
