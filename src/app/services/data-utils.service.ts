import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataUtilsService {

  constructor(private http: HttpClient) { }

  public getQNAData(): any {
      const reqUrl = 'https://opentdb.com/api.php?amount=10&type=multiple';
      return this.http.get(reqUrl,
      {
        observe: 'response',
        responseType: 'json',
      });
  }
}
