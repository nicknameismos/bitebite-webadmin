import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ManageShopService {

    constructor(private http: Http) { }

    getLocalJSONshoplist(): Observable<any> {
        return this.http.get('../../../assets/data/listshop.json')
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error));
    }
    // searchShop(typeTab, currentPage, keyword): Observable<any> {
    //     return this.http.post('../../../assets/data/listshop.json', {
    //         typename: typeTab,
    //         currentpage: currentPage,
    //         keyword: keyword
    //     })
    //         .map((res: Response) => res.json())
    //         .catch((error: any) => Observable.throw(error));
    // }
}