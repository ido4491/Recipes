import { Store } from "./store.model";
import { Http } from "@angular/http";

import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http/';
import {isUndefined} from "util";
@Injectable()
export class StoresService {
    stores: Store[] = [];
    public bestStore:string;
    constructor(public http: Http) { }


    getStores() {
        return this.http.get('https://us-central1-recipewebapp-4a3c3.cloudfunctions.net/app/stores')
            .map((response: Response) => {
                const stores = response.json().obj;
                const transformedStrores: Store[] = [];
                for (const store in stores) {
                    transformedStrores.push(new Store(
                        stores[store].name,
                        stores[store].city,
                        stores[store].lon,
                        stores[store].lat,
                    ));
                }
                return transformedStrores;
            });
    }
    getStoresGroupedByCity() {
        return this.http.get('https://us-central1-recipewebapp-4a3c3.cloudfunctions.net/app/stores')
            .map((response: Response) => {
                const stores = response.json().obj;
                const groupStore: number[] = [];
                groupStore.fill(0);
                let count: number[] = [];
                let data: string[] = [];
                const transformedStrores: Store[] = [];

              stores.filter( (x) => {
                if (isUndefined(groupStore[x.city])) {
                  groupStore[x.city] = 0;
                }
                groupStore[x.city]++;
              });
              for (const tmp in groupStore) {
                count.push(groupStore[tmp]);
                data.push(tmp);
              }

                return {storesNames: data, count: count, StoreGroup: groupStore} ;
            });
    }


}
