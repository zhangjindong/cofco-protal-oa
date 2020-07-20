import { HttpClient } from '@angular/common/http';
import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import {
  catchError,
  filter,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', './modal.scss'],
})
export class RegisterComponent implements OnInit, AfterContentInit {
  msg = '';
  myForm: FormGroup;
  xieyi = false;
  error: any = { username: false, email: false };
  formSubmitSubject$: Subject<any>;
  vertifyInvId;
  vertifyInvStauts = false;
  getCodeStatus = true;
  @ViewChild('btnVertify') btnVertify;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    protected keycloakService: KeycloakService,
  ) {
    this.formSubmitSubject$ = new Subject();
    this.formSubmitSubject$
      .pipe(
        filter(() => this.vertifyInvStauts === true),
        tap(() => this.validate(this.myForm)),
        switchMap(() =>
          this.myForm.statusChanges.pipe(
            startWith(this.myForm.status),
            tap(status => this.myForm.value),

            tap(status => console.log(status)),
            filter(status => status !== 'PENDING'),
            take(1),
          ),
        ),
        filter(status => status === 'VALID'),
      )
      .subscribe(() => this.register());
  }

  ngOnInit(): void {
    (this.myForm = this.fb.group({
      vertify: [null, Validators.required],
      xieyi: [null, Validators.required],
      code: [null, Validators.required],
      qiye: [null, Validators.required],
      roles: [null],
      username: [null, [Validators.required, this.usernameValidator]],
      firstName: [null, Validators.required],
      lastName: [null],
      email: [null, [Validators.required, Validators.email]],
      enabled: [true],
      attributes: this.fb.group({
        reppassword: [null, [Validators.required]],
        externalId: [null],
        finalOid: this.fb.array([this.fb.control(null, Validators.required)]),
        finalOname: this.fb.array([this.fb.control(null, Validators.required)]),
        parentOid: this.fb.array([this.fb.control(null)]),
        parentOname: this.fb.array([this.fb.control(null)]),
        password: this.fb.array([
          this.fb.control(null, [Validators.required, this.passValidator]),
        ]),
        phone: this.fb.array([this.fb.control(null)]),
      }),
    })),
      combineLatest(
        this.password.valueChanges,
        this.reppassword.valueChanges,
      ).subscribe(d => this.comparePwd(d));
    this.vertify.valueChanges
      .pipe(filter(value => !this.vertifyInvStauts && value.length === 6))
      .subscribe(() => {
        this.doChenkVertify();
      });
  }

  ngAfterContentInit(): void {
    window.scroll(0, 0);
  }
  private passValidator = (control: FormControl) => {
    const passReg = /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,})(?=.*[!@#$%^&*?\(\)]).*$/;
    if (!control.value) {
      return { status: 'error', message: '此项是必填项' };
    }
    if (!passReg.test(control.value)) {
      return { status: 'error', message: '密码格式不正确' };
    }
    return {};
  };
  // private usernameValidator: ValidatorFn = (control: FormControl): ValidationErrors | null => {
  //   const passReg = /^(\w){4,18}$/;
  //   return (!passReg.test(control.value)) ? { 'formart': true } : null;
  // };
  private usernameValidator = (control: FormControl) => {
    const passReg = /^[a-zA-Z0-9_-]{4,16}$/;
    let result = {};
    if (!control.value) {
      result = { status: 'error', message: '此项是必填项' };
    }
    if (!passReg.test(control.value)) {
      result = { status: 'error', message: '密码格式不正确' };
    }
    return result;
  };

  private validate = _validateForm => {
    for (const i in _validateForm.controls) {
      _validateForm.controls[i].markAsDirty({ onlySelf: true });
      _validateForm.controls[i].updateValueAndValidity({ onlySelf: true });
    }
    return !!_validateForm.valid;
  };
  checkCode(code) {
    if (code && code.length === 8) {
      this.http.get(`/api/cus/invitation/${code}`).subscribe((result: any) => {
        if (result.code === 200) {
          const inv = result.data;
          const finalOid = [inv.orgType !== '_1_' ? inv.finalOid : inv.oid];
          const parentOid = [inv.orgType !== '_1_' ? inv.parentOid : inv.oid];
          const finalOname = [
            inv.orgType !== '_1_' ? inv.finalOname : inv.name,
          ];
          const parentOname = [
            inv.orgType !== '_1_' ? inv.parentOname : inv.name,
          ];
          this.myForm.patchValue({
            vertify: '',
            qiye: inv.name,
            roles: JSON.parse(inv.roles),
            lastName: inv.name,
            email: inv.email,
            attributes: {
              externalId: inv.oid,
              finalOid,
              parentOid,
              finalOname,
              parentOname,
              phone: [inv.phone],
            },
          });
        }
      });
    }
  }
  // 获取机构信息
  getInvitation(oid): Observable<any> {
    return this.http.get(`/api/cus/baseinfo/${oid}`);
  }
  checkUserName(username) {
    if (!username) {
      return false;
    }
    this.http
      .get(`/api/user/check/username/${username}`)
      .subscribe((res: any) => {
        if (res.length > 0) {
          this.error.username = '登录账号已存在！';
        } else {
          this.error.username = false;
        }
      });
  }
  checkEmail(email) {
    if (!email) {
      return false;
    }
    this.http.get(`/api/user/check/username/${email}`).subscribe((res: any) => {
      if (res.length > 0) {
        this.error.email = '邮箱已存在！';
      } else {
        this.error.email = false;
      }
    });
  }
  register() {
    this.msg = '';
    if (false === this.error.username && false === this.error.email) {
      combineLatest(
        this.http.get(
          `/api/user/check/username/${this.myForm.getRawValue().username}`,
        ),
        this.http.get(
          `/api/user/check/email/${this.myForm.getRawValue().email}`,
        ),
      ).subscribe((result: any) => {
        if (!!result) {
          if (result[0].length === 0 && result[1].length === 0) {
            this.http
              .post(`/api/user`, {
                user: this.myForm.getRawValue(),
                client: 'factbusicorewebnewpaas',
                code: this.myForm.getRawValue().code,
              })
              .subscribe((res: any) => {
                if (res == null || (res.code && res.code === 200)) {
                  // tslint:disable-next-line:no-unused-expression
                  // confirm('注册成功，将跳转到登录界面！') &&  this.keycloakService.login({ redirectUri: window['links'].coreweb });
                  confirm('注册成功，将跳转到登录界面！') &&
                    (window.location.href = window['links'].coreweb);
                } else {
                  if (!!res.error) {
                    this.msg = res.error;
                  } else if (typeof res.message === 'object') {
                    if (!!res.message.errorMessage) {
                      this.msg = res.message.errorMessage;
                    }
                  } else {
                    if (!!res.message) {
                      this.msg = res.message.errorMessage;
                    }
                  }
                }
              });
          } else {
            alert('用户名或邮箱已存在！');
          }
        }
      });
    }
  }

  get finalOid() {
    return this.myForm.get('attributes').get('finalOid') as FormArray;
  }

  get password() {
    return this.myForm.get('attributes').get('password') as FormArray;
  }

  get phone() {
    return (this.myForm.get('attributes').get('phone') as FormArray)
      .controls[0] as FormControl;
  }

  get reppassword() {
    return this.myForm.get('attributes').get('reppassword') as FormControl;
  }

  get vertify() {
    return this.myForm.get('vertify') as FormControl;
  }
  comparePwd(data) {
    console.log(data);

    const pwd = this.password.value;
    const nep = this.reppassword.value;

    if (pwd[0] && nep) {
      if (pwd[0] !== nep) {
        this.reppassword.setErrors({ equal: true });
      }
    }
  }
  async doLogin() {
    await this.keycloakService.login({ redirectUri: window.location.origin });
  }
  setXieyi() {
    this.myForm.get('xieyi').setValue(true);
  }
  /**
   * 发送验证码
   *
   * @memberof RegisterComponent
   */
  doSendVertify() {
    console.log(4241724538765);
    if (this.phone.value == null || this.phone.value == '') {
      alert('手机号不可为空！');
      return;
    }

    this.http
      .get(`/api/message/ali/send/${this.phone.value}`)
      .pipe(
        catchError(error => {
          console.error(error);
          return of({ code: 500, error });
        }),
      )
      .subscribe((result: any) => {
        if (result.code == 200) {
          this.getCodeStatus = false;
          //this.btnVertify.nativeElement.disabled = true;
          let vertifytime = result.data;
          this.btnVertify.nativeElement.value = `等待(${vertifytime})`;
          this.vertifyInvId = setInterval(() => {
            --vertifytime;

            this.getCodeStatus = false;
            this.btnVertify.nativeElement.value = `等待(${vertifytime})`;
            if (vertifytime === 0) {
              clearInterval(this.vertifyInvId);
              this.getCodeStatus = true;
              //this.btnVertify.nativeElement.disabled = false;
              this.btnVertify.nativeElement.value = `获取验证码`;
            }
          }, 1000);
        } else {
          alert('获取验证码失败');
        }
      });
  }
  doChenkVertify() {
    if (this.phone.value !== '' && this.vertify.value !== '') {
      this.http
        .get(`/api/message/ali/check/${this.phone.value}/${this.vertify.value}`)
        .subscribe((result: any) => {
          if (result.code === 200) {
            clearInterval(this.vertifyInvId);
            //this.btnVertify.nativeElement.disabled = true;
            this.getCodeStatus = false;
            this.btnVertify.nativeElement.value = `验证成功`;
            this.vertifyInvStauts = true;
          } else {
            this.vertify.setErrors({ errors: true });
            //this.btnVertify.nativeElement.disabled = false;
            //this.getCodeStatus = true;
            // this.vertify.setValue('');
            //this.btnVertify.nativeElement.value = `验证码输入错误，请重新输入`;
          }
        });
    }
  }
}
