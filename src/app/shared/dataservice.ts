import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DataService {

private messageSource = new BehaviorSubject('Dashboard');

constructor(){}

public changeLink(linkName: any){
this.messageSource.next(linkName);
}


getLink(): Observable<any> {

    return this.messageSource.asObservable();
}


setLink(linkName: string){

    this.messageSource.next(linkName)

}

} 