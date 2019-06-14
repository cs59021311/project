import { IAccount, IRoleAccount } from 'src/app/shareds/services/account.service';
import { PageChangedEvent } from 'ngx-bootstrap';

export interface IMembersComponent {
    items: IMember;

    // ส่วนของการค้นหา
    searchText: string;
    searchType: IMemberSearchKey;
    searchTypeItems: IMemberSearchKey[];
    onSearchItem(): void;

    // ส่วนของ pagination
    startPage: number;
    limitPage: number;
    onPageChanged(Page: PageChangedEvent);

    getRoleName(role: IRoleAccount): string;
    onDeleteMember(item: IAccount): void;
    onUpdateMember(item: IAccount): void;

    UserLogin: IAccount;
    Role: typeof IRoleAccount;
}

export interface IMember {
    items: IAccount[];
    totalItems: number;
}

export interface IMemberSearch {
  searchText?: string;    // "?" จะบ่งบอกว่าตรงนี้จะกรอก หรือไม่กรอกก็ได้
  searchType?: string;

  startPage: number;
  limitPage: number;
}

export interface IMemberSearchKey {
    key: string;
    value: string;
}
