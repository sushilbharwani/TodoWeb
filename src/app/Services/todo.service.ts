import { Injectable } from '@angular/core';
import { Http, Response , RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ACTIONS } from '../Reducers/todoreducer';
import { environment } from '../../environments/environment';

import { ApiService, REQUEST_TYPE_GET , REQUEST_TYPE_DELETE , REQUEST_TYPE_POST , REQUEST_TYPE_PUT} from '../Services/api.service';

@Injectable()
export class TodoService {
  constructor(private http: Http, private apiService: ApiService) { }

  // use request options to always set {'withCredentials':true} as well as passing a body on DELETE requests
getTodos(): Observable <any> {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.apiService.callApiService({
          requestType: REQUEST_TYPE_GET,
          url: `${environment.url}todos`,
          headers: headers
     });
}

addTodo(todo): Observable <any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_POST,
      url: `${environment.url}todos`,
      headers: headers,
      body: JSON.stringify(todo)
    });
}

removeTodo(id): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_DELETE,
      url: `${environment.url}todos/` + id,
      headers: new Headers({ 'Content-Type': 'application/json' }),
   });
}

 updateTodo(todo): Observable <any> {
    const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.apiService.callApiService({
            requestType: REQUEST_TYPE_PUT,
            url: `${environment.url}/todo`,
            headers: headers,
            body: todo,
            shouldBlock: true
  });
}
}
