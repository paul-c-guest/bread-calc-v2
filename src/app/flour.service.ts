import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Flour } from 'server/src/flour';

@Injectable({
  providedIn: 'root'
})

export class FlourService {
  private uriRoot = 'http://localhost:5200';
  private uri = this.uriRoot + '/flours';

  private flours$: Subject<Flour[]> = new Subject();

  constructor(private http: HttpClient) { }

  getFlours(): Subject<Flour[]> {
    this.refreshFlours();
    return this.flours$;
  }

  getFlour(id: string): Observable<Flour> {
    return this.http.get<Flour>(`${this.uri}/${id}`);
  }

  createFlour(flour: Flour): Observable<string> {
    return this.http.post(this.uri, flour, { responseType: "text" });
  }

  updateFlour(id: string, flour: Flour): Observable<string> {
    return this.http.put(`${this.uri}/${id}`, flour, { responseType: "text" });
  }

  deleteFlour(id: string): Observable<string> {
    return this.http.delete(`${this.uri}/${id}`, { responseType: "text" });
  }

  private refreshFlours() {
    this.http
      .get<Flour[]>(`${this.uri}`)
      .subscribe(result => {
        result = this.sort(result);
        this.flours$.next(result);
      });
  };

  // sort flours alphabetically, ignoring case
  private sort(arr: Flour[]): Flour[] {
    arr.sort((a: Flour, b: Flour) => {

      const first = a.name.toLocaleLowerCase();
      const second = b.name.toLocaleLowerCase();

      if (first > second) return 1;
      if (second > first) return -1;
      else return 0;

    });

    return arr;
  }

}    
