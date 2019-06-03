import { Component, OnInit } from '@angular/core';
import { IMemberCreateComponent } from './member-create.interface';
import { IRoleAccount } from 'src/app/shareds/services/account.service';
import { SharedsService } from 'src/app/shareds/services/shareds.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { MemberService } from '../../services/member.service';
import { Router } from '@angular/router';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from '../../authentication.url';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css'],
  providers: [MemberService]
})
export class MemberCreateComponent implements IMemberCreateComponent {
  constructor(
    private shareds: SharedsService,
    private builder: FormBuilder,
    private alert: AlertService,
    private member: MemberService,
    private router: Router

  ) {
    this.initialCreateFormData();

    // เพิ่ม position // ถ้าต้องการแก้ position ไปแก้ที่หน้า shareds.service.ts นะ เดี๋ยวลืม!
    this.positionItems = this.shareds.positionItems;
   }

  form: FormGroup;
  positionItems: string[];
  roleItems: IRoleAccount[] = [
      IRoleAccount.Member,
      IRoleAccount.Employee,
      IRoleAccount.Admin
  ];

  // บันทึกหรือแก้ไขข้อมูล
  onSubmit(): void {
    if (this.form.invalid)
        return this.alert.someting_wrong();
    this.member
        .createMember(this.form.value)
        .then(res => {
            this.alert.notify('บันทึกข้อมูลสำเร็จ', 'info');
            this.router.navigate(['/', AppURL.Authen, AuthURL.Member]);
        })
        .catch(err => this.alert.notify(err.Message));
  }

  // แสดงข้อมูลสิทธิ์ผู้ใช้เป็น ชื่อตัวหนังสือ
  getRoleName(role: IRoleAccount): string {
      return IRoleAccount[role];
  }

  // แสดงตัวอย่างภาพอัพโหลด
  onConvertImage(input: HTMLInputElement) {
    const imageControl = this.form.controls['image'];
      this.shareds
          .onConvertImage(input)
          .then(base64 => imageControl.setValue(base64))
          .catch(err => {
              imageControl.setValue(null);
              input.value = null;
              imageControl.setValue(null);
              this.alert.notify(err.Message);
          });
  }

  // สร้างฟอร์ม
  private initialCreateFormData() {
    this.form = this.builder.group({
        image: [],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/^[A-z0-9]{5,15}$/)]],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        position: ['', Validators.required],
        role: ['', Validators.required]
    });
  }
}
