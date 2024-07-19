import { Observable, share, finalize } from 'rxjs';

export const shared = (c: any, req: Observable<any>) => {
  c.cached_observable = null;

  if (c.cached_observable) {
    return c.cached_observable;
  } else {
    c.cached_observable = null;
    c.cached_observable = req.pipe(share(), finalize(() => c.cached_observable = null));
    return c.cached_observable;
  }
}