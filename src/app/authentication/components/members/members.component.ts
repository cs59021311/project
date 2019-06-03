import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { IMembersComponent, IMemberSearchKey, IMemberSearch, IMember } from './members.interface';
import { IAccount, IRoleAccount } from 'src/app/shareds/services/account.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { PageChangedEvent } from 'ngx-bootstrap';

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.css'],
    providers: [MemberService]
})
export class MembersComponent implements IMembersComponent {
    constructor(
        private member: MemberService,
        private alert: AlertService,
        private detect: ChangeDetectorRef // กระตุ้น Event
    ) {
        this.initialLoadMembers({
            startPage: this.startPage,
            limitPage: this.limitPage
        });

        // กำหนดค่าเริ่มต้นให้กับ searchType
        this.searchType = this.searchTypeItems[0];
    }

    items: IMember;

    // ตัวแปรสำหรับค้นหา
    searchText: string = '';
    searchType: IMemberSearchKey;
    searchTypeItems: IMemberSearchKey[] = [
        { key: 'email', value: 'ค้นหาจากอีเมล์' },
        { key: 'firstname', value: 'ค้นหาจากชื่อ' },
        { key: 'lastname', value: 'ค้นหาจากนามสกุล' },
        { key: 'position', value: 'ค้นหาจากตำแหน่ง' },
        { key: 'role', value: 'ค้นหาจากสิทธิ์ผู้ใช้' }
    ];

    // ตัวแปร pagination
    startPage: number = 1;
    limitPage: number = 10;

    // เปลี่ยนหน้า pagination
    onPageChanged(page: PageChangedEvent) {
        this.initialLoadMembers({
          searchText: this.searchType.key == 'role' ? IRoleAccount[this.searchText] || '' : this.searchText,
          searchType: this.searchType.key,
          startPage: page.page,
          limitPage: page.itemsPerPage
        });
    }

    // ค้นหาข้อมูล
    onSearchItem() {
        this.startPage = 1;
        this.initialLoadMembers({
            searchText: this.searchType.key == 'role' ? IRoleAccount[this.searchText] || '' : this.searchText,
            searchType: this.searchType.key,
            startPage: this.startPage,
            limitPage: this.limitPage
        });
        // กระตุ้น Event
        this.detect.detectChanges();
      }

    // แสดงชื่อสิทธิ์ผู้ใช้งาน
    getRoleName(role: IRoleAccount) {
      return IRoleAccount[role];
    }

    // โหลดข้อมูลสมาชิก
    private initialLoadMembers(options?: IMemberSearch) {
        this.member
        .getMembers(options)
        .then(items => this.items = items)
        .catch(err => this.alert.notify(err.Message));
    }
}
