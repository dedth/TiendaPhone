import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Comentario } from 'src/app/models/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent {
  nombre='';
  email='';
  comentario='';
  private subscription: Subscription | undefined;

  constructor(
    private comentarioService: ComentarioService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onCreate(): void {
    const comentario = new Comentario(this.nombre, this.email, this.comentario);
    this.subscription = this.comentarioService.create(comentario).subscribe(
      (data: any) => {
        this.toastr.success(data.message, 'Gracias por su sugerencia', {
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
    this.router.navigate(['/']); 
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
