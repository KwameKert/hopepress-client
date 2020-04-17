import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

 
  private _baseUrl :String = environment.api_host;
  constructor(private _httpClient: HttpClient) { }


  public getDashBoard(): Observable<any>{
    return this._httpClient.get(`${this._baseUrl}/dashboard/`);
  }
}
