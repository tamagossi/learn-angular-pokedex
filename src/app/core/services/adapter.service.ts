import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

export class AdapterService {
  constructor(public client: HttpClient) {}

  protected async sendGetRequest({
    url,
    params,
    onSuccess,
    onError,
  }: {
    url: string;
    params?: Record<string, any>;
    onSuccess?: () => void;
    onError?: (err: any, caught: Observable<Object>) => any;
  }) {
    return this.client.get(encodeURI(url), { params }).pipe(
      tap(onSuccess),
      catchError(
        onError
          ? onError
          : (err) => {
              throw Error(err);
            }
      )
    );
  }
}
