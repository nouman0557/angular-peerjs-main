import { Component, OnInit } from '@angular/core';
import { PhoneAuthService } from '../firebase/phone-auth.service';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-api-testing',
  templateUrl: './api-testing.component.html',
  styleUrls: ['./api-testing.component.scss']
})
export class ApiTestingComponent implements OnInit {

  constructor(
    private phoneAuth: PhoneAuthService,
  ) { }
  submitted = false
  loading = false
  phoneNumber = '03157682557'
  recaptchaverifier: any
  windowRef: any;

  ngOnInit(): void {
    this.windowRef = this.phoneAuth.windowRef;
  }

  test() {
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': function (recapchaToken) {
        // reCAPTCHA solved, send recapchaToken and phone number to backend.
        console.log('Yes Hiting -->', recapchaToken);
      }
    });
  }
  tokenTest = "03AGdBq27FkO-ySuiJJGiHT4Vbs5fOr4vlVXllNHfkAKRH_TmLuLfO-h2hv5VZFd4-fd5CT294z7TXKnTLqaLesbs3d5nSvUjAAnlNmKyQghIIQ-u0Q38sMlCD7scUvooPsB9R9mjCXeoZ4s3nRdcAhg4TVta45kf_8jjtIRuB1oE9jDbU4479BBeOaYYkL5SC8aPZJMHkZL8NbdhF4_-d9hIWVWAqfe68vT2oqIrcVvkclUs5NWAeKzbvc92y8hYE--kWWn3pkdXr7Dn_lQ4z6nYOOIzrokt1wXA0N__VFrY9RUDmxGbD_i9m9jS0Yk7GFjmYxZeVp4X5q3sPA4jjUxPw07Qy6YUsNsJCgv4pe-bkh5eJqsQFV3UbwBOhuxj1rhMW8J-9vS3WwnGpUF7Ak7QKl0Lf65CJ9Yhn8k58SFkdI9idx8nAwMppZpMeryy_IdHRqkGNl3zqIUnTrTDyC52rXpbY3JmnPg"
  verifyPhoneNumber() {
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      { size: 'invisible' }
    );
    this.windowRef.recaptchaVerifier.render();
    let token = this.windowRef.recaptchaVerifier;
    let body = {
      phoneNumber: "+923157682557",
      recapchaToken: this.windowRef.localStorage._grecaptcha,
    }

    console.log('This is request body-->', this.windowRef.localStorage._grecaptcha)
    // let data = JSON.parse(JSON.stringify(body))
    this.tokenTest = this.windowRef.localStorage._grecaptcha
    this.phoneAuth.verifyPhoneNumber(body).then((result: any) => {
      console.log('API result', result)
    }).catch((err: any) => {
      console.log('This is error from Promise-->', err);
    });


  }
  sendVerificationCode() {
    let that = this;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      { size: 'invisible' }
    );
    this.windowRef.recaptchaVerifier.render();
    const appVerifier = this.windowRef.recaptchaVerifier;
    const phoneNumber = "+923464848226";
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((result) => {
        this.windowRef.confirmationResult = result;
      })
      .catch(
        (error) =>
          (this.sendCodeError(error))
      );
  }

  sendCodeError(error) {
    console.log('Recaptcha verifier have a error-->', error)
  }


}

