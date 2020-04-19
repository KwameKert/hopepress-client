import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class DataService {


 
private _baseUrl :String = environment.api_host;    

private messageSource = new BehaviorSubject('Dashboard');

private countDown = new BehaviorSubject('000000')

constructor(private _httpClient: HttpClient){}





getCountDown(): Observable<any>{
    return this.countDown.asObservable();
}
setCountDown(time: string){
    this.countDown.next(time);
}
getLink(): Observable<any> {

    return this.messageSource.asObservable();
}


setLink(linkName: string){
    this.messageSource.next(linkName)
}

public getNextEvent(): Observable<any>{
    return this._httpClient.get(`${this._baseUrl}/dashboard/nextEvent`);
  }

} 