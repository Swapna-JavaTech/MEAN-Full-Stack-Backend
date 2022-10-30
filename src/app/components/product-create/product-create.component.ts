import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {


  submitted = false;
  productForm!: FormGroup;

  constructor(public fb : FormBuilder,
              private router : Router,
              private ngZone : NgZone,
              private productService : ProductService) { 
    this.mainForm();
  }

  mainForm() {
    this.productForm = this.fb.group({
      productName : ['',[Validators.required]],
      productBrand : ['',[Validators.required]],
      productPrice : ['',[Validators.required,Validators.pattern('^[0-9]+$')]]
    })
  }

  ngOnInit(): void {
  }

  get myForm(){
    return this.productForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if(!this.productForm.valid){
      console.log("valid or not")
      return false;
    }else{
      return this.productService.createProduct(this.productForm.value).subscribe({
        complete:() => {
          console.log("product added successfully");
          this.ngZone.run(() => this.router.navigateByUrl('/products-list'));
        },
        error: (e) =>{
          console.log(e);
        },
      });
    }
  }
}
