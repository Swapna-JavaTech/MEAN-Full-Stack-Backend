import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  Product : any = [];

  constructor(private productService : ProductService) { 
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getProducts().subscribe((data) =>{
      this.Product = data;
    })
  }

  removeProduct(product: any,index: any){
    if(window.confirm("are you sure?")){
      this.productService.deleteProduct(product._id).subscribe((data) =>{
        this.Product.splice(index,1);
      })
    }
  }
  ngOnInit(): void {
  }

}
