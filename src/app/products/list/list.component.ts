import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { ToastrService } from 'ngx-toastr';


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
    this.productService.delete(id).subscribe(
      data => {
        this.toastr.success('Producto Eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarProducts();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

}