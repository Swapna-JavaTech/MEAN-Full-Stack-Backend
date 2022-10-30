import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  submitted = false;
  productEditForm!: FormGroup;

  constructor(public fb : FormBuilder,
              private router : Router,
              private actRoute : ActivatedRoute,
              private productService : ProductService) { 
  }

  mainForm() {
    this.productEditForm = this.fb.group({
      productName : ['',[Validators.required]],
      productBrand : ['',[Validators.required]],
      productPrice : ['',[Validators.required,Validators.pattern('^[0-9]+$')]]
    })
  }

  ngOnInit(): void {
    this.mainForm();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getProduct(id);
  }

  getProduct(id : any){
    this.productService.getProduct(id).subscribe((data) =>{
      this.productEditForm.setValue({
        productName : data['productName'],
        productBrand  : data['productBrand'],
        productPrice : data['productPrice']
      });
    });
  }

  get myForm(){
    return this.productEditForm.controls;
  }

  onSubmit() {
    this.submitted = true;
      if(window.confirm('are you sure?')){
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.productService.updateProduct(id,this.productEditForm.value).subscribe({
        complete:() => {
          console.log("product updated successfully");
          this.router.navigateByUrl("/products-list")
        },
        error: (e) =>{
          console.log(e);
        },
      });
    }
    }
  }

