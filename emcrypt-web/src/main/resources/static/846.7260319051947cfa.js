"use strict";(self.webpackChunkdemo1=self.webpackChunkdemo1||[]).push([[846],{5846:(ft,f,l)=>{l.r(f),l.d(f,{AuthModule:()=>gt});var i=l(6895),r=l(4006),_=l(529),m=l(6962),t=l(4650);const v=["root",""],w=function(){return{"background-image":"url(./assets/media/misc/auth-bg.png)"}};let b=(()=>{class o{constructor(){this.today=new Date}ngOnInit(){}ngOnDestroy(){}}return o.\u0275fac=function(n){return new(n||o)},o.\u0275cmp=t.Xpm({type:o,selectors:[["body","root",""]],attrs:v,decls:32,vars:2,consts:[[1,"d-flex","flex-column","flex-lg-row","flex-column-fluid"],[1,"d-flex","flex-column","flex-lg-row-fluid","w-lg-50","p-10","order-2","order-lg-1"],[1,"d-flex","flex-center","flex-column","flex-lg-row-fluid"],[1,"<?php","echo","$params['wrapperClass']?>","p-10"],[1,"d-flex","flex-center","flex-wrap","px-5"],[1,"d-flex","fw-semibold","text-primary","fs-base"],["href","#","target","_blank",1,"px-5"],[1,"d-flex","flex-lg-row-fluid","w-lg-50","bgi-size-cover","bgi-position-center","order-1","order-lg-2",3,"ngStyle"],[1,"d-flex","flex-column","flex-center","py-15","px-5","px-md-15","w-100"],["routerLink","/",1,"mb-12"],["alt","Logo","src","./assets/media/logos/custom-1.png",1,"h-75px"],["src","./assets/media/misc/auth-screens.png","alt","",1,"mx-auto","w-275px","w-md-50","w-xl-500px","mb-10","mb-lg-20"],[1,"text-white","fs-2qx","fw-bolder","text-center","mb-7"],[1,"text-white","fs-base","text-center"],["href","#",1,"opacity-75-hover","text-warning","fw-bold","me-1"]],template:function(n,e){1&n&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),t._UZ(4,"router-outlet"),t.qZA()(),t.TgZ(5,"div",4)(6,"div",5)(7,"a",6),t._uU(8,"Terms"),t.qZA(),t.TgZ(9,"a",6),t._uU(10,"Plans"),t.qZA(),t.TgZ(11,"a",6),t._uU(12,"Contact Us"),t.qZA()()()(),t.TgZ(13,"div",7)(14,"div",8)(15,"a",9),t._UZ(16,"img",10),t.qZA(),t._UZ(17,"img",11),t.TgZ(18,"h1",12),t._uU(19," Fast, Efficient and Productive "),t.qZA(),t.TgZ(20,"div",13),t._uU(21," In this kind of post, "),t.TgZ(22,"a",14),t._uU(23,"the blogger"),t.qZA(),t._uU(24," introduces a person they\u2019ve interviewed "),t._UZ(25,"br"),t._uU(26," and provides some background information about "),t.TgZ(27,"a",14),t._uU(28,"the interviewee"),t.qZA(),t._uU(29," and their "),t._UZ(30,"br"),t._uU(31," work following this is a transcript of the interview. "),t.qZA()()()()),2&n&&(t.xp6(13),t.Q6J("ngStyle",t.DdM(1,w)))},dependencies:[i.PC,m.lC,m.rH],styles:["[_nghost-%COMP%]{height:100%}"]}),o})();var g=l(590),c=l(831);function x(o,s){if(1&o&&(t.ynx(0),t.TgZ(1,"div",18)(2,"div",19),t._uU(3," Use account "),t.TgZ(4,"strong"),t._uU(5),t.qZA(),t._uU(6," and password "),t.TgZ(7,"strong"),t._uU(8),t.qZA(),t._uU(9," to continue. "),t.qZA()(),t.BQk()),2&o){const n=t.oxw();t.xp6(5),t.Oqu(n.defaultAuth.email),t.xp6(3),t.Oqu(n.defaultAuth.password)}}function T(o,s){1&o&&(t.ynx(0),t.TgZ(1,"div",20)(2,"div",21),t._uU(3," The login details are incorrect "),t.qZA()(),t.BQk())}function C(o,s){1&o&&(t.ynx(0),t.TgZ(1,"span",22),t._uU(2," Please wait... "),t._UZ(3,"span",23),t.qZA(),t.BQk()),2&o&&(t.xp6(1),t.Udp("display","block"))}function P(o,s){1&o&&(t.ynx(0),t.TgZ(1,"span",24),t._uU(2,"Continue"),t.qZA(),t.BQk())}function Z(o,s){if(1&o&&(t.ynx(0),t.TgZ(1,"div",25)(2,"span",26),t._uU(3),t.qZA()(),t.BQk()),2&o){const n=t.oxw().message;t.xp6(3),t.hij(" ",n," ")}}function y(o,s){if(1&o&&t.YNc(0,Z,4,1,"ng-container",3),2&o){const n=s.control;t.Q6J("ngIf",n.hasError(s.validation)&&(n.dirty||n.touched))}}const h=function(o,s){return{"is-invalid":o,"is-valid":s}},q=function(o){return{validation:"required",message:"Email is required",control:o}},O=function(o){return{validation:"email",message:"Email is invalid",control:o}},A=function(o){return{validation:"minLength",message:"Email should have at least 3 symbols",control:o}},F=function(o){return{validation:"maxLength",message:"Email should have maximum 360 symbols",control:o}},k=function(o){return{validation:"required",message:"Password is required",control:o}},U=function(o){return{validation:"minlength",message:"Password should have at least 3 symbols",control:o}},L=function(o){return{validation:"maxLength",message:"Password should have maximum 100 symbols",control:o}};let J=(()=>{class o{constructor(n,e,a,d){this.fb=n,this.authService=e,this.route=a,this.router=d,this.defaultAuth={email:"team@olta.la",password:"12345678"},this.unsubscribe=[],this.isLoading$=this.authService.isLoading$,this.authService.currentUserValue&&this.router.navigate(["/"])}ngOnInit(){this.initForm(),this.returnUrl=this.route.snapshot.queryParams["returnUrl".toString()]||"/"}get f(){return this.loginForm.controls}initForm(){this.loginForm=this.fb.group({email:[this.defaultAuth.email,r.kI.compose([r.kI.required,r.kI.email,r.kI.minLength(3),r.kI.maxLength(320)])],password:[this.defaultAuth.password,r.kI.compose([r.kI.required,r.kI.minLength(3),r.kI.maxLength(100)])]})}submit(){this.hasError=!1;const n=this.authService.login(this.f.email.value,this.f.password.value).pipe((0,g.P)()).subscribe(e=>{e?this.router.navigate([this.returnUrl]):this.hasError=!0});this.unsubscribe.push(n)}ngOnDestroy(){this.unsubscribe.forEach(n=>n.unsubscribe())}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(r.qu),t.Y36(c.e),t.Y36(m.gz),t.Y36(m.F0))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-login"]],decls:37,vars:46,consts:[["novalidate","novalidate","id","kt_login_signin_form",1,"form","w-100",3,"formGroup","ngSubmit"],[1,"text-center","mb-11"],[1,"text-dark","fw-bolder","mb-3"],[4,"ngIf"],[1,"fv-row","mb-8"],[1,"form-label","fs-6","fw-bolder","text-dark"],["type","email","name","email","formControlName","email","autocomplete","off",1,"form-control","bg-transparent",3,"ngClass"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],[1,"fv-row","mb-3"],[1,"form-label","fw-bolder","text-dark","fs-6","mb-0"],["type","password","name","password","autocomplete","off","formControlName","password",1,"form-control","bg-transparent",3,"ngClass"],[1,"d-flex","flex-stack","flex-wrap","gap-3","fs-base","fw-semibold","mb-8"],["routerLink","/auth/forgot-password",1,"link-primary"],[1,"d-grid","mb-10"],["type","submit","id","kt_sign_in_submit",1,"btn","btn-primary",3,"disabled"],[1,"text-gray-500","text-center","fw-semibold","fs-6"],["routerLink","/auth/registration",1,"link-primary"],["formError",""],[1,"mb-10","bg-light-info","p-8","rounded"],[1,"text-info"],[1,"mb-lg-15","alert","alert-danger"],[1,"alert-text","font-weight-bold"],[1,"indicator-progress"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"],[1,"indicator-label"],[1,"fv-plugins-message-container"],["role","alert"]],template:function(n,e){if(1&n&&(t.TgZ(0,"form",0),t.NdJ("ngSubmit",function(){return e.submit()}),t.TgZ(1,"div",1)(2,"h1",2),t._uU(3,"Sign In"),t.qZA()(),t.YNc(4,x,10,2,"ng-container",3),t.YNc(5,T,4,0,"ng-container",3),t.TgZ(6,"div",4)(7,"label",5),t._uU(8,"Email"),t.qZA(),t._UZ(9,"input",6),t.GkF(10,7)(11,7)(12,7)(13,7),t.qZA(),t.TgZ(14,"div",8)(15,"label",9),t._uU(16,"Password"),t.qZA(),t._UZ(17,"input",10),t.GkF(18,7)(19,7)(20,7),t.qZA(),t.TgZ(21,"div",11),t._UZ(22,"div"),t.TgZ(23,"a",12),t._uU(24," Forgot Password ? "),t.qZA()(),t.TgZ(25,"div",13)(26,"button",14),t.YNc(27,C,4,2,"ng-container",3),t.ALo(28,"async"),t.YNc(29,P,3,0,"ng-container",3),t.ALo(30,"async"),t.qZA()(),t.TgZ(31,"div",15),t._uU(32," Not a Member yet? "),t.TgZ(33,"a",16),t._uU(34," Sign up "),t.qZA()()(),t.YNc(35,y,1,1,"ng-template",null,17,t.W1O)),2&n){const a=t.MAs(36);t.Q6J("formGroup",e.loginForm),t.xp6(4),t.Q6J("ngIf",!e.hasError),t.xp6(1),t.Q6J("ngIf",e.hasError),t.xp6(4),t.Q6J("ngClass",t.WLB(26,h,e.loginForm.controls.email.invalid,e.loginForm.controls.email.valid)),t.xp6(1),t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.VKq(29,q,e.loginForm.controls.email)),t.xp6(1),t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.VKq(31,O,e.loginForm.controls.email)),t.xp6(1),t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.VKq(33,A,e.loginForm.controls.email)),t.xp6(1),t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.VKq(35,F,e.loginForm.controls.email)),t.xp6(4),t.Q6J("ngClass",t.WLB(37,h,e.loginForm.controls.password.invalid,e.loginForm.controls.password.valid)),t.xp6(1),t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.VKq(40,k,e.loginForm.controls.password)),t.xp6(1),t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.VKq(42,U,e.loginForm.controls.password)),t.xp6(1),t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.VKq(44,L,e.loginForm.controls.password)),t.xp6(6),t.Q6J("disabled",e.loginForm.invalid),t.xp6(1),t.Q6J("ngIf",t.lcZ(28,22,e.isLoading$)),t.xp6(2),t.Q6J("ngIf",!1===t.lcZ(30,24,e.isLoading$))}},dependencies:[i.mk,i.O5,i.tP,m.rH,r._Y,r.Fj,r.JJ,r.JL,r.sg,r.u,i.Ov],styles:["[_nghost-%COMP%]{width:100%}@media (min-width: 992px){[_nghost-%COMP%]   .login-form[_ngcontent-%COMP%]{width:100%;max-width:450px}[_nghost-%COMP%]   .login-form[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{width:100%}}"]}),o})();function Q(o,s){1&o&&(t.ynx(0),t.TgZ(1,"div",14)(2,"div",15),t._uU(3," Sorry, looks like there are some errors detected, please try again. "),t.qZA()(),t.BQk())}function I(o,s){1&o&&(t.ynx(0),t.TgZ(1,"div",16)(2,"div",17),t._uU(3,"Sent password reset. Please check your email"),t.qZA()(),t.BQk())}function S(o,s){1&o&&(t.ynx(0),t.TgZ(1,"span",18),t._uU(2," Please wait... "),t._UZ(3,"span",19),t.qZA(),t.BQk())}function E(o,s){if(1&o&&(t.ynx(0),t.TgZ(1,"div",20)(2,"div",21)(3,"span",22),t._uU(4),t.qZA()()(),t.BQk()),2&o){const n=t.oxw().message;t.xp6(4),t.Oqu(n)}}function M(o,s){if(1&o&&t.YNc(0,E,5,1,"ng-container",4),2&o){const n=s.control;t.Q6J("ngIf",n.hasError(s.validation)&&(n.dirty||n.touched))}}const N=function(o,s){return{"is-invalid":o,"is-valid":s}},Y=function(o){return{validation:"required",message:"Email is required",control:o}},V=function(o){return{validation:"email",message:"Email is invalid",control:o}},B=function(o){return{validation:"minLength",message:"Email should have at least 3 symbols",control:o}},K=function(o){return{validation:"maxLength",message:"Email should have maximum 360 symbols",control:o}};var u=(()=>{return(o=u||(u={}))[o.NotSubmitted=0]="NotSubmitted",o[o.HasError=1]="HasError",o[o.NoError=2]="NoError",u;var o})();let G=(()=>{class o{constructor(n,e){this.fb=n,this.authService=e,this.errorState=u.NotSubmitted,this.errorStates=u,this.unsubscribe=[],this.isLoading$=this.authService.isLoading$}ngOnInit(){this.initForm()}get f(){return this.forgotPasswordForm.controls}initForm(){this.forgotPasswordForm=this.fb.group({email:["emre@beamteknoloji.com",r.kI.compose([r.kI.required,r.kI.email,r.kI.minLength(3),r.kI.maxLength(320)])]})}submit(){this.errorState=u.NotSubmitted;const n=this.authService.forgotPassword(this.f.email.value).pipe((0,g.P)()).subscribe(e=>{this.errorState=0==e.code?u.NoError:u.HasError});this.unsubscribe.push(n)}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(r.qu),t.Y36(c.e))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-forgot-password"]],decls:26,vars:26,consts:[["novalidate","novalidate","id","kt_login_password_reset_form",1,"form","w-100",3,"formGroup","ngSubmit"],[1,"text-center","mb-10"],[1,"text-dark","fw-bolder","mb-3"],[1,"text-gray-500","fw-semibold","fs-6"],[4,"ngIf"],[1,"fv-row","mb-8"],[1,"form-label","fw-bolder","text-gray-900","fs-6"],["type","email","formControlName","email","placeholder","Email","name","email","autocomplete","off",1,"form-control","bg-transparent",3,"ngClass"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],[1,"d-flex","flex-wrap","justify-content-center","pb-lg-0"],["type","submit","id","kt_password_reset_submit",1,"btn","btn-primary","me-4"],[1,"indicator-label"],["routerLink","/auth/login","id","kt_login_password_reset_form_cancel_button",1,"btn","btn-light"],["formError",""],[1,"mb-lg-15","alert","alert-danger"],[1,"alert-text","font-weight-bold"],[1,"mb-10","bg-light-info","p-8","rounded"],[1,"text-info"],[1,"indicator-progress"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"],[1,"fv-plugins-message-container"],[1,"fv-help-block"],["role","alert"]],template:function(n,e){if(1&n&&(t.TgZ(0,"form",0),t.NdJ("ngSubmit",function(){return e.submit()}),t.TgZ(1,"div",1)(2,"h1",2),t._uU(3," Forgot Password ? "),t.qZA(),t.TgZ(4,"div",3),t._uU(5," Enter your email to reset your password. "),t.qZA()(),t.YNc(6,Q,4,0,"ng-container",4),t.YNc(7,I,4,0,"ng-container",4),t.TgZ(8,"div",5)(9,"label",6),t._uU(10,"Email"),t.qZA(),t._UZ(11,"input",7),t.GkF(12,8)(13,8)(14,8)(15,8),t.qZA(),t.TgZ(16,"div",9)(17,"button",10)(18,"span",11),t._uU(19,"Submit"),t.qZA(),t.YNc(20,S,4,0,"ng-container",4),t.ALo(21,"async"),t.qZA(),t.TgZ(22,"a",12),t._uU(23," Cancel "),t.qZA()()(),t.YNc(24,M,1,1,"ng-template",null,13,t.W1O)),2&n){const a=t.MAs(25);t.Q6J("formGroup",e.forgotPasswordForm),t.xp6(6),t.Q6J("ngIf",e.errorState===e.errorStates.HasError),t.xp6(1),t.Q6J("ngIf",e.errorState===e.errorStates.NoError),t.xp6(4),t.Q6J("ngClass",t.WLB(15,N,e.forgotPasswordForm.controls.email.invalid,e.forgotPasswordForm.controls.email.valid)),t.xp6(1),t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.VKq(18,Y,e.forgotPasswordForm.controls.email)),t.xp6(1),t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.VKq(20,V,e.forgotPasswordForm.controls.email)),t.xp6(1),t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.VKq(22,B,e.forgotPasswordForm.controls.email)),t.xp6(1),t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.VKq(24,K,e.forgotPasswordForm.controls.email)),t.xp6(5),t.Q6J("ngIf",t.lcZ(21,13,e.isLoading$))}},dependencies:[i.mk,i.O5,i.tP,m.rH,r._Y,r.Fj,r.JJ,r.JL,r.sg,r.u,i.Ov],styles:["[_nghost-%COMP%]{width:100%}@media (min-width: 992px){[_nghost-%COMP%]   .login-form[_ngcontent-%COMP%]{width:100%;max-width:450px}[_nghost-%COMP%]   .login-form[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{width:100%}}"]}),o})(),$=(()=>{class o{constructor(n){this.authService=n,this.authService.logout()}ngOnInit(){}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(c.e))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-logout"]],decls:2,vars:0,template:function(n,e){1&n&&(t.TgZ(0,"p"),t._uU(1,"logout works!"),t.qZA())}}),o})();class j{static MatchPassword(s){var n,e,a;(null===(n=s.get("password"))||void 0===n?void 0:n.value)!==(null===(e=s.get("cPassword"))||void 0===e?void 0:e.value)&&(null===(a=s.get("cPassword"))||void 0===a||a.setErrors({ConfirmPassword:!0}))}}function W(o,s){1&o&&(t.ynx(0),t.TgZ(1,"div",13)(2,"div",14),t._uU(3," 'Passsword' and 'Confirm Password' didn't match. "),t.qZA()(),t.BQk())}function H(o,s){1&o&&(t.ynx(0),t.TgZ(1,"span",15),t._uU(2,"Submit"),t.qZA(),t.BQk())}function z(o,s){1&o&&(t.ynx(0),t.TgZ(1,"span",16),t._uU(2," Please wait... "),t._UZ(3,"span",17),t.qZA(),t.BQk()),2&o&&(t.xp6(1),t.Udp("display","block"))}function X(o,s){if(1&o&&(t.ynx(0),t.TgZ(1,"div",13)(2,"div",14)(3,"span",18),t._uU(4),t.qZA()()(),t.BQk()),2&o){const n=t.oxw().message;t.xp6(4),t.hij(" ",n," ")}}function D(o,s){if(1&o&&t.YNc(0,X,5,1,"ng-container",9),2&o){const n=s.control;t.Q6J("ngIf",n.hasError(s.validation)&&(n.dirty||n.touched))}}const p=function(o,s){return{"is-invalid":o,"is-valid":s}},R=function(o){return{validation:"required",message:"Email is required",control:o}},tt=function(o){return{validation:"email",message:"Email is invalid",control:o}},ot=function(o){return{validation:"minlength",message:"Email should have at least 3 symbols",control:o}},et=function(o){return{validation:"maxLength",message:"Email should have maximum 360 symbols",control:o}},nt=function(o){return{validation:"required",message:"Password is required",control:o}},rt=function(o){return{validation:"minlength",message:"Password should have at least 3 symbols",control:o}},st=function(o){return{validation:"maxLength",message:"Password should have maximum 100 symbols",control:o}},at=function(o){return{validation:"required",message:"Confirm Password is required",control:o}},it=function(o){return{validation:"minlength",message:"Confirm Password should have at least 3 symbols",control:o}},lt=function(o){return{validation:"maxLength",message:"Confirm Password should have maximum 100 symbols",control:o}},ut=[{path:"",component:b,children:[{path:"",redirectTo:"login",pathMatch:"full"},{path:"login",component:J,data:{returnUrl:window.location.pathname}},{path:"forgot-password",component:G},{path:"activate",component:(()=>{class o{constructor(n,e,a,d){this.fb=n,this.authService=e,this.router=a,this.route=d,this.unsubscribe=[],this.isLoading$=this.authService.isLoading$,this.authService.currentUserValue&&this.router.navigate(["/"])}ngOnInit(){this.initForm()}get f(){return this.setPasswordForm.controls}initForm(){this.setPasswordForm=this.fb.group({email:["emre@beamteknoloji.com",r.kI.compose([r.kI.required,r.kI.email,r.kI.minLength(3),r.kI.maxLength(320)])],password:["",r.kI.compose([r.kI.required,r.kI.minLength(3),r.kI.maxLength(100)])],cPassword:["",r.kI.compose([r.kI.required,r.kI.minLength(3),r.kI.maxLength(100)])]},{validator:j.MatchPassword})}submit(){this.hasError=!1;const n={};Object.keys(this.f).forEach(a=>{n[a]=this.f[a].value});const e=this.authService.setPassword(this.route.snapshot.queryParams.link,n.password).pipe((0,g.P)()).subscribe(a=>{a?this.router.navigate(["/dashboard"]):this.hasError=!0});this.unsubscribe.push(e)}ngOnDestroy(){this.unsubscribe.forEach(n=>n.unsubscribe())}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(r.qu),t.Y36(c.e),t.Y36(m.F0),t.Y36(m.gz))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-registration"]],decls:35,vars:61,consts:[["novalidate","novalidate","id","kt_login_signup_form",1,"form","w-100",3,"formGroup","ngSubmit"],[1,"text-center","mb-11"],[1,"text-dark","fw-bolder","mb-3"],[1,"fv-row","mb-8"],[1,"form-label","fw-bolder","text-dark","fs-6"],["type","email","placeholder","Email","name","email","formControlName","email","autocomplete","off",1,"form-control","bg-transparent",3,"ngClass"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],["type","password","placeholder","Password","name","password","formControlName","password","autocomplete","off",1,"form-control","bg-transparent",3,"ngClass"],["type","password","placeholder","Confirm password","name","cPassword","autocomplete","off","formControlName","cPassword",1,"form-control","bg-transparent",3,"ngClass"],[4,"ngIf"],[1,"d-grid","mb-10"],["type","submit","id","kt_sign_up_submit",1,"btn","btn-primary",3,"disabled"],["formError",""],[1,"fv-plugins-message-container"],[1,"fv-help-block"],[1,"indicator-label"],[1,"indicator-progress"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"],["role","alert"]],template:function(n,e){if(1&n&&(t.TgZ(0,"form",0),t.NdJ("ngSubmit",function(){return e.submit()}),t.TgZ(1,"div",1)(2,"h1",2),t._uU(3,"Set Your Password"),t.qZA()(),t.TgZ(4,"div",3)(5,"label",4),t._uU(6,"Email"),t.qZA(),t._UZ(7,"input",5),t.GkF(8,6)(9,6)(10,6)(11,6),t.qZA(),t.TgZ(12,"div",3)(13,"label",4),t._uU(14,"Password"),t.qZA(),t._UZ(15,"input",7),t.GkF(16,6)(17,6)(18,6),t.qZA(),t.TgZ(19,"div",3)(20,"label",4),t._uU(21,"Confirm Password"),t.qZA(),t._UZ(22,"input",8),t.GkF(23,6)(24,6)(25,6),t.YNc(26,W,4,0,"ng-container",9),t.qZA(),t.TgZ(27,"div",10)(28,"button",11),t.YNc(29,H,3,0,"ng-container",9),t.ALo(30,"async"),t.YNc(31,z,4,2,"ng-container",9),t.ALo(32,"async"),t.qZA()()(),t.YNc(33,D,1,1,"ng-template",null,12,t.W1O)),2&n){const a=t.MAs(34);t.Q6J("formGroup",e.setPasswordForm),t.xp6(7),t.Q6J("ngClass",t.WLB(32,p,e.setPasswordForm.controls.email.invalid,e.setPasswordForm.controls.email.valid)),t.xp6(1),t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.VKq(35,R,e.setPasswordForm.controls.email)),t.xp6(1),t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.VKq(37,tt,e.setPasswordForm.controls.email)),t.xp6(1),t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.VKq(39,ot,e.setPasswordForm.controls.email)),t.xp6(1),t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.VKq(41,et,e.setPasswordForm.controls.email)),t.xp6(4),t.Q6J("ngClass",t.WLB(43,p,e.setPasswordForm.controls.password.invalid,e.setPasswordForm.controls.password.valid)),t.xp6(1),t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.VKq(46,nt,e.setPasswordForm.controls.password)),t.xp6(1),t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.VKq(48,rt,e.setPasswordForm.controls.password)),t.xp6(1),t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.VKq(50,st,e.setPasswordForm.controls.password)),t.xp6(4),t.Q6J("ngClass",t.WLB(52,p,e.setPasswordForm.controls.cPassword.invalid,e.setPasswordForm.controls.cPassword.valid)),t.xp6(1),t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.VKq(55,at,e.setPasswordForm.controls.cPassword)),t.xp6(1),t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.VKq(57,it,e.setPasswordForm.controls.cPassword)),t.xp6(1),t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.VKq(59,lt,e.setPasswordForm.controls.cPassword)),t.xp6(1),t.Q6J("ngIf",e.setPasswordForm.controls.cPassword.errors&&e.setPasswordForm.controls.cPassword.errors.ConfirmPassword),t.xp6(2),t.Q6J("disabled",e.setPasswordForm.invalid),t.xp6(1),t.Q6J("ngIf",!1===t.lcZ(30,28,e.isLoading$)),t.xp6(2),t.Q6J("ngIf",t.lcZ(32,30,e.isLoading$))}},dependencies:[i.mk,i.O5,i.tP,r._Y,r.Fj,r.JJ,r.JL,r.sg,r.u,i.Ov],styles:["[_nghost-%COMP%]{width:100%}@media (min-width: 992px){[_nghost-%COMP%]   .login-form[_ngcontent-%COMP%]{width:100%;max-width:450px}[_nghost-%COMP%]   .login-form[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{width:100%}}"]}),o})()},{path:"logout",component:$},{path:"",redirectTo:"login",pathMatch:"full"},{path:"**",redirectTo:"login",pathMatch:"full"}]}];let dt=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[m.Bz.forChild(ut),m.Bz]}),o})();var ct=l(7292);let gt=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[i.ez,ct.q,dt,r.u5,r.UX,_.JF]}),o})()}}]);