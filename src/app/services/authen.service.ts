import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
    private accessKey = 'accessToken';

    // กำหนดค่า access token ไว้ในความจำ browser // จะหายก็ต่อเมื่อมีการเครียร์ ความจำใน browser
    setAuthenticated(accessToken: string): void {
        localStorage.setItem(this.accessKey, accessToken);
    }

     // ดึงค่า access token ไว้ในความจำ browser ออกมา
    getAuthenticated(): string {
        return localStorage.getItem(this.accessKey);  // accessKey คือการกำหนด คีย์ให้เป็นเบื้องต้น
    }

    // ล้างค่า access token ที่อยู่ในความจำ browser
    clearAuthenticated(): void {
        localStorage.removeItem(this.accessKey);
    }
}
