import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup } from '@angular/forms';

export interface IChangePasswordComponent {
  modalRef: BsModalRef;
  form: FormGroup;

  onSubmit();
}
