import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Celulares } from 'src/app/models/celular';
import { Producto } from 'src/app/models/producto';
import { CartService } from 'src/app/services/cart.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  index = 0;
  productos: Producto[] = [];
  listaVacia: string | undefined;

constructor(
  private productService: ProductosService,
  private router: Router,
  private cartService: CartService,

) {}
//Carusel
selectIndex(i: number) {
  this.index = i;
}
onPreviousClick() {
  const previous = this.index - 1;
  this.selectIndex(previous < 0 ? 2 : previous);
}
onNextClick() {
  const next = this.index + 1;
  this.selectIndex(next > 2 ? 0 : next);
}
//fin carusel
//tab
activeTab = 'celulares';

selectTab(tabName: string) {
  this.activeTab = tabName;
}

//productos
ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productService.lista().subscribe(
      (data: Producto[]) => {
        this.productos = data;
        this.listaVacia = undefined;
      },
      (error) => {
        this.listaVacia = 'No hay productos disponibles';
        console.error(error);
      }
    );
  }

  addToCart(producto: Producto): void {
    this.cartService.addToCart(producto);
  }

}

