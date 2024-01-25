import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Comentario } from 'src/app/models/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-coment-detail',
  templateUrl: './coment-detail.component.html',
  styleUrls: ['./coment-detail.component.css']
})
export class ComentDetailComponent {

  comentario: Comentario ={
    nombre: '',
    email: '',
    comentario: ''
  };

  constructor(
    private comentarioService: ComentarioService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.comentarioService.getDetail(id).subscribe(
      (data: any) => {
        this.comentario = data;
      },
      (err: any) => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.volver();
      }
    );
  }

  volver(): void {
    this.router.navigate(['/dashboard/comentarios']);
  }

}
