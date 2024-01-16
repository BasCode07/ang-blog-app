import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit{


   postArray: any = [];

  constructor(private postService: PostsService){}

  ngOnInit(): void {
    this.postService.loadData().subscribe(val => {
      this.postArray = val;
    })
   
  }

  onDelete(postImgPath, id){
    this.postService.daleteImage(postImgPath, id);
  }

  onfeatured(id, value){
    const featuredData = {
      isFeatured: value
    }

    this.postService.markfeafured(id, featuredData)
  }



}
