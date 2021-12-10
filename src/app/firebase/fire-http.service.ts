import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FireHttpService {

  constructor(
    private httpClint: HttpClient,

  ) { }
  baseURL = 'http://localhost:5000/api/v1/drivers/onboarding/initverify'

  verifyPhoneNumber(requestData: any) {
    return this.httpClint.post(this.baseURL, requestData)
  }


}
