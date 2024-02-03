import {ActivatedRoute, CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {LocalStorageService} from "../../services/storage-service/local-storage.service";
import {ToastrService} from "ngx-toastr";

export const noAuthGuard: CanActivateFn = (
  route,
  state
) => {
  // const LocalStorage = inject(LocalStorageService);
  const router = inject(Router);
  const toastr = inject(ToastrService);
  if (LocalStorageService.tokenIsValid()) {
    return true;
  }
  toastr.error('You must be logged in', 'Login required', {timeOut: 3000});
  router.navigate(['sign-in']);
  return false;
};

export const AuthGuard: CanActivateFn = (
  route,
  state
) => {
  const router : Router = inject(Router);
  const toastr = inject(ToastrService);
  if (!LocalStorageService.tokenIsValid()) {
    return true;
  }
  toastr.error('You are already logged in', '', {timeOut: 4000});
  router.navigate(['tickets/all']);
  return false;
};
