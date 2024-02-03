import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {LocalStorageService} from "../services/storage-service/local-storage.service";

// export const emailVerifGuard: CanActivateFn = (
//   route,
//   state) => {
//   const router = inject(Router);
//   const IsVerifyingEmail = localStorage.getItem('IsVerifyingEmail');
//   if(IsVerifyingEmail === 'true'){
//     // localStorage.removeItem('emailVerified');
//     // router.navigate(['/sign-in']);
//     return true;
//   }
//   return false;
// };

export const signedUpGuard: CanActivateFn = (
  route,
  state) => {
  const router = inject(Router);
  const isSignedUp = localStorage.getItem('isSignedUp');
  const toastr = inject(ToastrService);
  if(isSignedUp !== 'true'){
    toastr.error('Failed to resend verification email, Please check you inbox or try again.', '', {timeOut: 5000});
  }
  return true;
};


