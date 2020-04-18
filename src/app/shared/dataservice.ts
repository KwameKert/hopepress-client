import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DataService {

private messageSource = new BehaviorSubject('Dashboard');

private countDown = new BehaviorSubject('000000')

constructor(){}





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

} 