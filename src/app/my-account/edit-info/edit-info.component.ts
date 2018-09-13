import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../data/user.model';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss']
})
export class EditInfoComponent implements OnInit {

  user: User;

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      _id: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      username: [''],
      picture: ['']
    });

    this.getUser();
  }

  getUser() {
    this.usersService.getCurrentUserDetail().subscribe(user => {
      this.user = user;
      this.userForm.patchValue({
        'firstName': this.user.firstName,
        'lastName': this.user.lastName,
        'email': this.user.email,
      });
    });
  }

  onSave() {
    const req = this.userForm.value;
    req['_id'] = this.user._id;
    this.usersService.updateUser(this.user._id, req).subscribe(res => {
      console.log(res);
    });
  }


  resetChanges() {
    console.log('resetChanges');
  }

}
