import { Injectable } from "@angular/core";
import { AccountService, IAccount, IRoleAccount } from 'src/app/shareds/services/account.service';
import { IMemberSearch, IMember } from '../components/members/members.interface';

@Injectable()
export class MemberService {
    constructor(private account: AccountService) {
        if (this.account.mockUserItems.length <= 2) // ใช้ generateMembers แค่ครั้งเดียว
          this.generateMembers();
    }

    // ดึงข้อมูลสมาชิกทั้งหมด
    getMembers(options?: IMemberSearch) {
      return new Promise<IMember>((resolve, reject) => {
          // เรียงลำดับข้อมูลใหม่ จากวันที่แก้ไขล่าสุด
          let items = this.account.mockUserItems.sort((a1, a2) => {
              return Date.parse(a2.updated.toString()) - Date.parse(a1.updated.toString());
          });

          // คำนวณเรื่อง Pagination
          const startItem = (options.startPage - 1) * options.limitPage;
          const endItem = options.startPage * options.limitPage;

          // หากมีการค้นหาข้อมูล
          if (options && options.searchText && options.searchType) {
            // ค้นหาข้อมูลมาเก็บไว้ในตัวแปร items
              items = this.account
                  .mockUserItems
                  .filter(item =>
                      item[options.searchType].toString().toLowerCase()
                          .indexOf(options.searchText.toString().toLowerCase()) >= 0
                  );
          }
          resolve({ items: items.slice(startItem, endItem), totalItems: items.length });
      });
    }

    // เพิ่มข้อมูลสมาชิก
    createMember(model: IAccount) {
        return new Promise((resolve, reject) => {
          if (this.account.mockUserItems.find(item => item.email == model.email))
              return reject({ Message: 'อีเมล์นี้มีอยู่ในระบบแล้ว' })
            model.id = Math.random();
            model.created = new Date();
            model.updated = new Date();
            this.account.mockUserItems.push(model);
            resolve(model);
        });
    }

    // จำลองข้อมูลสมาชิก เพื่อทำ Pagination
    private generateMembers() {
        const position = ['ผู้ดูแลระบบจัดการรายได้', 'ผู้ดูแลระบบบัญชีผู้ใช้'];
        const roles = [IRoleAccount.Member, IRoleAccount.Employee, IRoleAccount.Admin];
        // this.account.mockUserItems.splice(2);
        for (let i = 3; i <= 300; i++)
            this.account.mockUserItems.push({
                id: i.toString(),
                firstname: `Firstname ${i}`,
                lastname: `Lastname ${i}`,
                email: `mail-${i}@gmail.com`,
                password: '123456',
                position: position[Math.round(Math.random() * 1)],
                role: roles[Math.round(Math.random() * 2)],
                created: new Date(),
                updated: new Date()
            });
    }
}
