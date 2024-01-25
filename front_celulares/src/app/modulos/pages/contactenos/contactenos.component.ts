import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactoService } from 'src/app/services/contacto.service';
import { Contacto } from 'src/app/models/contacto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contactenos',
  templateUrl: './contactenos.component.html',
  styleUrls: ['./contactenos.component.css']
})
export class ContactenosComponent implements OnDestroy {

  nombre = '';
  email = '';
  asunto = '';
  mensage = '';
  private subscription: Subscription | undefined;

  constructor(
    private contactoService: ContactoService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onCreate(): void {
    const contacto = new Contacto(this.nombre, this.email, this.asunto, this.mensage);
    this.subscription = this.contactoService.create(contacto).subscribe(
      (data: any) => {
        this.toastr.success(data.message, 'Gracias por contactarnos', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.volver();
      },
      (err: any) => {
        this.toastr.error(err.error.message, 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  volver(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.router.navigate(['/']); // Ajusta la redirección según tus necesidades
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
