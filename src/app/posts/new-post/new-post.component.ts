import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/service/categories.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {

  permalink: string = '';
  imgSrc: any = "./assets/img-place-holder.jpeg"
  selectedImg: any;
  categories: any = [];
  postForm: FormGroup;

  constructor( private fb: FormBuilder, private categoryService: CategoriesService){

      this.postForm = this.fb.group({
        title: ['', [Validators.required, Validators.maxLength(10)]],
        permalink: ['', Validators.required],
        excerpt: ['', [Validators.required, Validators.maxLength(50)]],
        category: ['', Validators.required],
        postImg: ['', Validators.required],
        content: ['', Validators.required]
      })

  }

  ngOnInit(): void{
   this.categoryService.loadData().subscribe(val => {
      this.categories = val;
   })
  }
   
  get fc(){
    return this.postForm.controls;
  }


  onTitleChange($event: any){
     const title = $event.target.value
    this.permalink = title.replace(/\s/g, '-');
     
  }

  showPreview($event: any){
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result
    }
    reader.readAsDataURL($event?.target.files[0])
    //this.selectedImg.$event.target.files[0];

  }

}
