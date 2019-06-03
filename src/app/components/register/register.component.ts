import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../app.url';
import { IRegisterComponent } from './register.interface';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AlertService } from '../../shareds/services/alert.service';
import { AccountService } from 'src/app/shareds/services/account.service';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shareds/services/validators.service';
declare let $;
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements IRegisterComponent {
    constructor(
        private builder: FormBuilder,
        private alert: AlertService,
        private account: AccountService,
        private router: Router,
        private validators: ValidatorsService
    ) {
        this.initialCreateFormData();
    }

    Url = AppURL;
    form: FormGroup;

    // ลงทะเบียน
    onSubmit() {
        if (this.form.invalid)
            return this.alert.someting_wrong();
            // ส่งข้อมูลหา server
        this.account
            .onRegister(this.form.value)    // onRegister ส่ง value เข้าไป
            .then(res => {
                this.alert.notify('ลงทะเบียนสำเร็จ!', 'info');  // ลงทะเบียนสำำเร็จให้ แสดง alert
                this.router.navigate(['/', AppURL.Login]);  // เด้งไปที่หน้า login
            })
            .catch(err => this.alert.notify(err.Message));  // แต่ถ้าเกิดมีการ error ก็มีการทำ notify ออกมา
    }

    // สร้างฟอร์ม
    private initialCreateFormData() {
        this.form = this.builder.group({
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, this.validators.isPassword]],
            cpassword: ['', [Validators.required, this.validators.comparePassword('password')]]
        });
    }

     // สร้าง validate เอง รหัสผ่านให้ตรงกัน ย้ายไป validators.service.ts
    // private comparePassword(passwordField: string) {
    //     return function (confirm_password: AbstractControl) {
    //         if (!confirm_password.parent) return;
    //         const password = confirm_password.parent.get(passwordField);
    //         const passwordSubscripe = password.valueChanges.subscribe(() => {
    //             confirm_password.updateValueAndValidity();
    //             passwordSubscripe.unsubscribe();
    //         });
    //         if (confirm_password.value === password.value)
    //             return;
    //         return { compare: true };
    //     }
    // }
}
