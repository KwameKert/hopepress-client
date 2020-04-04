import { Injectable } from '@angular/core';
import { environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private clientId: string = "3118fdd8bd7b53f";
  private url: string = 'https://api.imgur.com/3/image';

  constructor(private _httpClient: HttpClient) { }


  public uploadImage(data: any){
    let header = new HttpHeaders({
      "authorization": 'Client-ID '+this.clientId
    });
    return this._httpClient.post(this.url, data, {headers:header})
  }

}
