import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../app.url';
import { ILoginComponent } from './login.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthURL } from 'src/app/authentication/authentication.url';
import { AccountService } from 'src/app/shareds/services/account.service';
import { AuthenService } from 'src/app/services/authen.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements ILoginComponent {
    constructor(
        private builder: FormBuilder,
        private alert: AlertService,
        private router: Router,
        private account: AccountService,
        private authen: AuthenService,
        private activateRouter: ActivatedRoute
    ) {
      // เก็บค่า return url เพื่อ redirect หลังจาก login
        this.activateRouter.params.forEach(params => {
            this.returnURL = params.returnURL || `/${AppURL.Authen}`;  // /${AuthURL.Dashboard}
        });
        this.initialCreateFormData();
    }

    Url = AppURL;
    returnURL: string;
    form: FormGroup;

    // เข้าสู่ระบบ
    onSubmit(): void {
        if (this.form.invalid)
            return this.alert.someting_wrong();
        this.account
            .onLogin(this.form.value)
            .then(res => {
                // console.log(res);
                // เก็บ session
                this.authen.setAuthenticated(res.accessToken);
                // laert และ redirect หน้า psge
                this.alert.notify('เข้าสู่ระบบสำเร็จ', 'info');
                this.router.navigateByUrl(this.returnURL);   // ['/', AppURL.Authen, AuthURL.Dashboard] ไปหน้า Dashboard
            })
            .catch(err => this.alert.notify(err.Message));
    }

    // สร้างฟอร์ม
    private initialCreateFormData() {
        this.form = this.builder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(/^[A-z0-9]{5,15}$/)]],
            remember: [true]
        });
    }
}
