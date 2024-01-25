import { Component } from '@angular/core';
import { Comentario } from 'src/app/models/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent {

  comentarios: Comentario[] = [];
  listaVacia: string | undefined;

  constructor(
    private comentarioService: ComentarioService,
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.comentarioService.getAll().subscribe(
      (data: Comentario[]) => {
        this.comentarios = data;
        this.listaVacia = undefined;
      },
      (error: any) => {
        this.listaVacia = 'No tienes comentarios en la pagina';
        console.error(error);
      }
    );
  }

  borrar(id: number): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar el comentario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí Borralo',
      cancelButtonText: 'No lo quiero conservar',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-success mr-4',
      },
      buttonsStyling: false,
      reverseButtons: true,
      iconHtml: '<i class="fas fa-exclamation-triangle"></i>',
    }).then((result) => {
      if (result.isConfirmed) {
        this.comentarioService.delete(id).subscribe(() => {
          this.cargarProductos();
          Swal.fire({
            title: 'Comentario eliminado',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          });
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'No se ha borrado el comentario',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        });
      }
    });
  }

}
