import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface IInterval {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}   

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

 
  private _baseUrl :String = environment.api_host;
  constructor(private _httpClient: HttpClient) { }


  public getDashBoard(): Observable<any>{
    return this._httpClient.get(`${this._baseUrl}/dashboard/`);
  }

  getIntervalTime(dateA: number, dateB: number): IInterval{
    let intervalTime: number = Math.floor((dateA - dateB) / 1000);
    return this.getTime(intervalTime);
}
private getTime(time : number) : IInterval{
    let interval: IInterval = 
    {days : 0, hours : 0, minutes : 0, seconds: 0};
    interval.days = Math.floor(time / 86400);
    time -= interval.days * 86400;
    interval.hours = Math.floor(time / 3600) % 24;
    time -= interval.hours * 3600;
    interval.minutes = Math.floor(time / 60) % 60;
    time -= interval.minutes * 60;
    interval.seconds = time % 60;
    return interval;
}


// getCountDown(timeToGo: number): Observable<IInterval> {
//   return Observable
//   .interval(1000)
//   .startWith(0)
//   .map(
//     x =>  this.getIntervalTime(timeToGo, Date.now())
//   )
// }
}
