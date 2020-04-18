import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DataService {

private messageSource = new BehaviorSubject('Dashboard');

private countDown = new BehaviorSubject('CountDown')

constructor(){}

public changeLink(linkName: any){
this.messageSource.next(linkName);
}

public changeCount(time: string){
    this.countDown.next(time)
}



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