import { Injectable } from "@angular/core";

@Injectable()
export class SharedsService {

  // ตำแหน่งของสมาชิก
    positionItems: any[] = [
      'ผู้ดูแลระบบบัญชีผู้ใช้',
      'ผู้ดูแลระบบจัดการรายได้'
    ];

      // แปลงไฟล์รูปเป็น Base64
  onConvertImage(input: HTMLInputElement) {
    return new Promise((resolve, reject) => {
        const imageTypes = ['image/jpeg', 'image/png'];
        // หากไม่มีการอัพโหลดภาพ
        if (input.files.length == 0)
          return resolve(null);

        // ตรวจสอบชนิดไฟล์ที่อัพโหลดเข้ามา
        if (imageTypes.indexOf(input.files[0].type) < 0) {
          return reject({ Message: 'กรุณาอัพโหลดรูปภาพเท่านั้น' });
        }

        const reader = new FileReader();
        reader.readAsDataURL(input.files[0]);

        // คืนค่า Image Base64 ออกไป
        reader.addEventListener('load', () => resolve(reader.result));
    });

  }

}
