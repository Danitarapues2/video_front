import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  products: Product[] = [];

  constructor(
    private productService: ProductsService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.cargarProducts();
  }

  cargarProducts(): void {
    this.productService.lista().subscribe(
      data => {
        this.products = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrar(id: number) {
    if (!id) {
      console.error('Trying to delete with undefined ID');
      return;
    }
    this.productService.delete(id).subscribe(
      () => {
        this.toastr.success('Producto Eliminado', 'OK', {
          timeOut: 3000, 
          positionClass: 'toast-top-center'
        });
        this.cargarProducts();
      },
      (err: HttpErrorResponse) => { 
        console.log(err);
        let errorMessage = 'Error al intentar eliminar el producto.';
        if (err.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMessage = `Error: ${err.error.message}`;
        } else if (err.status === 404) {
          // Manejar específicamente el error 404
          errorMessage = 'Producto no encontrado';
        } else if (typeof err.error === 'string') {
          // Manejar una respuesta de error que no es JSON
          errorMessage = err.error;
        } else if (err.error && err.error.mensaje) {
          // Manejar una respuesta de error JSON
          errorMessage = err.error.mensaje;
        }
        this.toastr.error(errorMessage, 'Fail', {
          timeOut: 3000,  
          positionClass: 'toast-top-center',
        });
      }
    );
  }
  
  
  
}