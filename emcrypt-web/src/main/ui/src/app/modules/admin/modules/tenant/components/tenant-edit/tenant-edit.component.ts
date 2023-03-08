import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HasSubscription } from 'src/app/common/models/model';
import { Tenant } from '../../model/tenant';
import { TenantService } from '../../services/tenant.service';

@Component({
  selector: 'app-tenant-edit',
  templateUrl: './tenant-edit.component.html',
  styleUrls: ['./tenant-edit.component.scss'],
})
export class TenantEditComponent
  extends HasSubscription
  implements OnInit, OnDestroy
{
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isDeleting$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  isDeleting: boolean;

  tenant: Tenant;

  tenantForm = new FormGroup({
    name: new FormControl<string | null>('', Validators.required),
    domain: new FormControl<string | null>('', Validators.required),
    owner: new FormControl<string | null>('', Validators.required),
  });

  constructor(
    private tenantService: TenantService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super();

    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    if (id === 'new') {
      this.tenant = new Tenant();
    } else {
      let subs = this.tenantService.get(id).subscribe((t) => {
        if (t == undefined) {
          // navigate back
        } else {
          this.tenant = t;
          this.tenantForm.patchValue(this.tenant);
        }
      });
      this.unsubscribe.push(subs);
    }
  }

  save() {
    this.isLoading$.next(true);
    let tenant = { ...this.tenant, ...this.tenantForm.value } as Tenant;
    let actionObs: Observable<Tenant | undefined>;
    if (tenant.id) {
      actionObs = this.tenantService.update(tenant);
    } else {
      actionObs = this.tenantService.create(tenant);
    }

    let subs = actionObs.subscribe((data) => {
      if (!tenant.id) {
        this.router.navigateByUrl('/admin/companies/' + data?.id);
      }
      this.isLoading$.next(false);
    });
    this.unsubscribe.push(subs);
  }

  delete() {
    this.isDeleting$.next(true);
    this.tenantService.delete(this.tenant.id).subscribe(() => {
      this.isDeleting$.next(false);
      setTimeout(() => {
        this.router.navigateByUrl('/admin/companies');
      }, 1500);
    });
  }

  ngOnDestroy(): void {
    super.onDestroy();
  }

  public get name(): FormControl {
    return this.tenantForm.controls.name;
  }

  public get domain(): FormControl {
    return this.tenantForm.controls.domain;
  }

  public get owner(): FormControl {
    return this.tenantForm.controls.owner;
  }
}
