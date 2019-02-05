import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../configs/dev-endpoint.config';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({providedIn: 'root'})
export class FileService {

  constructor(private http: HttpClient) { }

  public uploadFile(file: File): Observable<Response> {
      const url = `${config.apiUrl}/api/create`;
      return this.http.post<any>(url, this.createFormData(file));
  }

  private createFormData(file: File): FormData {
      const formData = new FormData();
      formData.append('newfile', file, file.name);
      return formData;
  }
}
