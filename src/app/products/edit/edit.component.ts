import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../models/product';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  product: Product | null = null;

  constructor(
    private productoService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.productoService.detail(id).subscribe(
      data => {
        this.product = data;
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (this.product) {  // Asegurarse de que this.product no es null
      this.productoService.update(id, this.product).subscribe(
        data => {
          this.toastr.success(data.message, 'OK', {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
          this.router.navigate(['/']);
        },
        err => {
          this.toastr.error(err.error.message, 'Fail', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
      );
    }
  }

  volver(): void {
    this.router.navigate(['/']);
  }
}
