import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { HttpErrorResponse } from '@angular/common/http'; // Importante para manejar errores HTTP

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'] // Asegúrate de usar 'styleUrls' en lugar de 'styleUrl'
})
export class CreateComponent implements OnInit {

  name = '';
  description = '';
  price: number = 0;
  errorMessage = ''; // Variable para almacenar el mensaje de error

  constructor(
    private productService: ProductsService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const product = new Product(this.name, this.description, this.price);
    this.productService.save(product).subscribe(
      (data) => {
        this.toastr.success(data.message, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Error desconocido al crear el producto.';
        }
        this.toastr.error(this.errorMessage, 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    );
  }

  volver(): void {
    this.router.navigate(['/']);
  }

}
