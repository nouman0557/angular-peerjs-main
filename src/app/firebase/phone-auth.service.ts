import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { firebaseConfig } from '../utilities/config';
import { FireHttpService } from './fire-http.service';

firebase.initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class PhoneAuthService {

  constructor(private fireHttpService: FireHttpService) { }

  get windowRef() {
    return window
  }


  verifyPhoneNumber(data: any) {
    return new Promise((resolve, reject) => {
      this.fireHttpService.verifyPhoneNumber(data).subscribe(
        response => {
          resolve(response)
        },
        err => {
          reject(err)
          console.log("Resources Api Response Error", err)
        })
    })
  }
}
