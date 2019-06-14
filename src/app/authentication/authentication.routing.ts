import { Routes, RouterModule } from '@angular/router';
import { AuthURL } from './authentication.url';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingComponent } from './components/setting/setting.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BootstrapElementsComponent } from './components/bootstrap-elements/bootstrap-elements.component';
import { CardsComponent } from './components/cards/cards.component';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { MembersComponent } from './components/members/members.component';
import { MemberCreateComponent } from './components/member-create/member-create.component';
import { UserRoleGuard } from '../guards/user-role.guard';
import { IRoleAccount } from '../shareds/services/account.service';

const RouteLists: Routes = [
    { path: '', redirectTo: AuthURL.Profile, pathMatch: 'full' }, // หน้า default
    {
      path: AuthURL.Dashboard, component: DashboardComponent,
      canActivate: [UserRoleGuard],
      data: { roles: [IRoleAccount.Admin, IRoleAccount.Employee] } // จำกัดสิทธิ์ให้ Admin,Employee เข้าถึงหน้านี้ได้
    },
    { path: AuthURL.Setting, component: SettingComponent },
    { path: AuthURL.Profile, component: ProfileComponent },
    { path: AuthURL.Element, component: BootstrapElementsComponent },
    { path: AuthURL.Card, component: CardsComponent },
    { path: AuthURL.Widget, component: WidgetsComponent },

    { path: AuthURL.Member, component: MembersComponent, // หน้า รายการสมาชิก
      canActivate: [UserRoleGuard], // canActivate: [UserRoleGuard] คือ เอาไว้ บล๊อกหน้า ไม่ให้เห็น
      data: { roles: [IRoleAccount.Admin, IRoleAccount.Employee] } // จำกัดสิทธิ์ให้ Admin,Employee เข้าถึงหน้านี้ได้
    },
    {
      path: AuthURL.MemberCreate, // หน้า เพิ่มสมาชิก
      canActivate: [UserRoleGuard],
      data: { roles: [IRoleAccount.Admin] }, // จำกัดสิทธิ์ให้ Admin เข้าถึงหน้านี้ได้
      children: [
          { path: '', component: MemberCreateComponent },   // ถ้าไม่มี id ส่งมาก็จะเข้า MemberCreateComponent
          { path: ':id', component: MemberCreateComponent }, // ถ้ามี id ส่งมาก็จะเข้า MemberCreateComponent
      ]
    }
];

export const AuthenticationRouting = RouterModule.forChild(RouteLists);
