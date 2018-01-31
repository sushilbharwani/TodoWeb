import { Injectable } from '@angular/core';
import { Http, Response, ResponseOptions, ResponseType, ResponseContentType, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
// declare Angular HTTP RequestType constants for callers
export const
    REQUEST_TYPE_GET = 'REQUEST_TYPE_GET',    // request.method === 0
    REQUEST_TYPE_POST = 'REQUEST_TYPE_POST',   // request.method === 1
    REQUEST_TYPE_PUT = 'REQUEST_TYPE_PUT',    // request.method === 2
    REQUEST_TYPE_DELETE = 'REQUEST_TYPE_DELETE'; // request.method === 3

@Injectable()
export class ApiService {

    constructor(
        private _http: Http,
        private _store: Store<any>
    ) { }

     // tslint:disable-next-line:max-line-length
     public callApiService({ requestType, url, headers, body, shouldBlock, responseType }: {requestType: string, url: string, headers?: Headers, body?: string, shouldBlock?: boolean, responseType?: ResponseContentType}): Observable<any> {

        if (!headers) {
            headers = new Headers();
        }

        // use request options to always set {'withCredentials':true} as well as passing a body on DELETE requests
        const requestOptions = new RequestOptions({
            body,
            headers,
            responseType,
            withCredentials: true
        });

        let response: Observable<Response>;
        // this._appStateActions.showLoaderGraphic(shouldBlock);
        const reqObj = {reqUrl : url, requestType : requestType }
        switch (requestType) {

            case REQUEST_TYPE_GET:
                response = this._http.get(url, requestOptions)
                    .map(res => {
                       // this._appStateActions.hideLoaderGraphic(reqObj);
                        return this.getResponseContent(url, res);
                    })
                    .catch(err => {
                       // this._appStateActions.hideLoaderGraphic(reqObj);
                        return Observable.throw(err);
                    });
                break;

            case REQUEST_TYPE_POST:
                response = this._http.post(url, body, requestOptions)
                    .map(res => {
                       //  this._appStateActions.hideLoaderGraphic(reqObj);
                        return this.getResponseContent(url, res);
                    })
                    .catch(err => {
                       //  this._appStateActions.hideLoaderGraphic(reqObj);
                        return Observable.throw(err);
                    });
                break;

            case REQUEST_TYPE_PUT:
                response = this._http.put(url, body, requestOptions)
                    .map(res => {
                       //  this._appStateActions.hideLoaderGraphic(reqObj);
                        return this.getResponseContent(url, res);
                    })
                    .catch(err => {
                      //   this._appStateActions.hideLoaderGraphic(reqObj);
                     return Observable.throw(err);
                    });
                break;

            case REQUEST_TYPE_DELETE:
                response = this._http.delete(url, requestOptions)
                    .map(res => {
                        // this._appStateActions.hideLoaderGraphic(reqObj);
                        return this.getResponseContent(url, res);
                    })
                    .catch(err => {
                        // this._appStateActions.hideLoaderGraphic(reqObj);
                        return Observable.throw(err);
                    });
                break;

            default:
                throw new Error(`invalid value provided for RequestType => [${requestType}]`);
        }
        return response;

    }

     public callApiServiceXhr({ requestType, url, headers, body, shouldBlock, responseType }): Observable<any> {
        // this._appStateActions.showLoaderGraphic(shouldBlock);
        const reqObj = {reqUrl : url, requestType : requestType, apiType : 'XHR'};
        return Observable.create((observer) => {
            const xhr = new XMLHttpRequest();
            xhr.open(requestType, url, true);
            xhr.withCredentials = true;
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    // this._appStateActions.hideLoaderGraphic(reqObj);
                    if (xhr.status === 200 || xhr.status === 201) {
                        // observer.next(JSON.stringify(xhr.response));
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(JSON.parse(xhr.response));
                    }
                }
            };
            xhr.send(body);
        });
    }

    private getResponseContent(url: string, res: Response) {
        try {
            let contentType = res.headers.get('content-type');
            if (contentType && contentType.indexOf(';') !== -1) {
                // strip the charset declaration to simplify the comparison
                contentType = contentType.substring(0, contentType.indexOf(';'));
            }
            // console.log(`contentType => [${contentType}]`);
            switch (contentType) {

                case 'application/x-file-download':
                    return res;

                case 'application/json':
                    return res.json();

                case 'text/plain':
                case 'text/html':
                    return res.text();

                case 'application/vnd.ms-excel':
                    return res.blob();

                case null:
                    return null;

                default:
                    return res.text() ? res.json() : {};
            }
        } catch (e) {
            const resContent = JSON.stringify(res).substr(0, 512);
             throw (e);
        }
        finally {
            //
        }
    }
}
