import {CanActivateFn, Router} from '@angular/router';
import {LocalStorageService} from "../services/storage-service/local-storage.service";
import {inject} from "@angular/core";
import {ToastrService} from "ngx-toastr";

export const redirectionGuard: CanActivateFn = (route, state) => {
  const router : Router = inject(Router);
  const toastr = inject(ToastrService);
  if(LocalStorageService.tokenIsValid() || localStorage.getItem('isSignedUp')) {
    return true
  }
  router.navigate(['sign-in']);
  toastr.info('You must be logged in', 'Login required', {timeOut: 4000});
  return false;
};

