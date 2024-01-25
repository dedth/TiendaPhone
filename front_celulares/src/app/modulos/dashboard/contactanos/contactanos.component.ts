import { Component } from '@angular/core';
import { Contacto } from 'src/app/models/contacto';
import { ContactoService } from 'src/app/services/contacto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent {

  contactanos: Contacto[] = [];
  listaVacia: string | undefined;

  constructor(
    private contactoService: ContactoService,
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.contactoService.getAll().subscribe(
      (data: Contacto[]) => {
        this.contactanos = data;
        this.listaVacia = undefined;
      },
      (error: any) => {
        this.listaVacia = 'No tienes mensages en la pagina';
        console.error(error);
      }
    );
  }

  borrar(id: number): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar el mensage',
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
        this.contactoService.delete(id).subscribe(() => {
          this.cargarProductos();
          Swal.fire({
            title: 'Mensage eliminado',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          });
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'No se ha borrado el mensage',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        });
      }
    });
  }

}
