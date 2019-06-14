import { Injectable } from "@angular/core";
import { IRegister } from 'src/app/components/register/register.interface';
import { ILogin } from 'src/app/components/login/login.interface';
import { IProfile } from 'src/app/authentication/components/profile/profile.interface';
import { IChangePassword } from 'src/app/authentication/components/profile/change-password/change-pasword.interface';

@Injectable({
    providedIn: 'root'
})
export class AccountService { // Service นี้คือ Global Service

  public mockUserItems: IAccount[] = [
    {
        id: 1,
        firstname: 'Admin',
        lastname: 'Admin',
        email: 'admin@gmail.com',
        password: '123456',
        position: 'ผู้ดูแลระบบบัญชีผู้ใช้',
        image: null,
        role: IRoleAccount.Admin,
        created: new Date(),
        updated: new Date()
    },
    {
        id: 2,
        firstname: 'Employee',
        lastname: 'Employee',
        email: 'employee@gmail.com',
        password: '123456',
        position: 'ผู้ดูแลระบบจัดการรายได้',
        image: null,
        role: IRoleAccount.Employee,
        created: new Date(),
        updated: new Date()
  },
    {
        id: 3,
        firstname: 'Member',
        lastname: 'Member',
        email: 'member@gmail.com',
        password: '123456',
        position: 'ผู้ดูแลระบบจัดการรายได้',
        image: null,
        role: IRoleAccount.Member,
        created: new Date(),
        updated: new Date()
  }
  ];

  // เปลี่ยนรหัสผ่านใหม่
  onChangePassword(accessToken: string, model: IChangePassword) {
      return new Promise((resolve, reject) => {
          const userProfile = this.mockUserItems.find(item => item.id == accessToken);
          if (!userProfile) return reject({ Message: 'ไม่มีข้อมูลผู้ใช้งาน' });
          if (userProfile.password != model.old_pass) return reject({ Message: 'รหัสผ่านเดิมไม่ถูกต้อง' });
          userProfile.password = model.new_pass;
          userProfile.updated = new Date();
          resolve(userProfile);
      });
  }

  // แก้ไขข้อมูลส่วนตัว Update profile
  onUpdateProfile(accessToken: string, model: IProfile) {
      return new Promise((resolve, reject) => {
          const userProfile = this.mockUserItems.find(user => user.id == accessToken);
          if (!userProfile) return reject({ Message: 'ไม่มีผู้ใช้งานนี้ในระบบ' });
          userProfile.firstname = model.firstname;
          userProfile.lastname = model.lastname;
          userProfile.position = model.position;
          userProfile.image = model.image;
          userProfile.updated = new Date();
          resolve(userProfile);
      });
  }

  // ดึงข้อมูลผู้ที่เข้าสู่ระบบ จาก Token
  getUserLogin(accessToken: string) {
      return new Promise<IAccount>((resolve, reject) => {
            const userLogin = this.mockUserItems.find(m => m.id == accessToken);
            if (!userLogin) return reject({ Message: 'accessToken ไม่ถูกต้อง' });
            resolve(userLogin);
      });
  }

  // เข้าสู่ระบบ
  onLogin(model: ILogin) {
      return new Promise<{ accessToken: string }>((resolve, reject) => {
          const userLogin = this.mockUserItems.find(item => item.email == model.email && item.password == model.password);
          if (!userLogin) return reject({ Message: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง' });
          resolve({
            accessToken: userLogin.id
          });
      });
  }

  // ลงทะเบียน
  onRegister(model: IRegister) {
      return new Promise((resolve, reject) => {
          const _model: IAccount = model;
          _model.id = Math.random();            //  สุ่ม id
          _model.image = null;
          _model.position = '';
          _model.role = IRoleAccount.Member;
          _model.created = new Date();
          _model.updated = new Date();
          this.mockUserItems.push(model);       // ทำให้เวลา register แล้วเอาค่าไป login ได้
          resolve(model);
       // reject({ Message: 'Error form server!' });  // ถ้าเกิดว่าข้อมูลที่มันถูกส่งมา มันถูกต้อง resolve ก็จะทำงาน
      });                                             // ถ้าอยากให้มัน แสดง error ก็ไปใช้ reject
    }

}

export interface IAccount {
    firstname: string;
    lastname: string;
    email: string;
    password: string;

    id?: any;
    position?: string;
    image?: string;
    role?: IRoleAccount;
    created?: Date;
    updated?: Date;
}

export enum IRoleAccount {
    Member = 1,
    Employee,
    Admin
}
