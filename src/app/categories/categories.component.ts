
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../service/categories.service';
import { Category } from '../models/category';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent{

  categoryArray: any  = [];
  formCategory!: string;
  formStatus: string = 'Add'
  categoryId!: string;

  constructor(private categoryService: CategoriesService){}

  ngOnInit(): void{

    this.categoryService.loadData().subscribe(val => {
      this.categoryArray = val;
      
    })

  }



onSubmit(formData: any){

  let categoryData: Category = {
    category: formData.value.category
  }
  if(this.formStatus == 'Add'){
    this.categoryService.saveData(categoryData);
    formData.reset();
  }
  else if(this.formStatus == 'Edit'){
    this.categoryService.updateData(this.categoryId, categoryData)
    formData.reset();
    this.formStatus = 'Add';
  }

  
    
}


onEdit(category: any, id: string){
  this.formCategory = category;
  this.formStatus = 'Edit';
  this.categoryId = id;
}

onDelete(id: string){
  this.categoryService.deleteData(id);
}



}