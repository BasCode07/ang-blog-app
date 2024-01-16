import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private storage: AngularFireStorage, 
    private afs: AngularFirestore, 
    private toastr: ToastrService,
    private router: Router   
    ) { }

    
  uploadImage(selectedImage: any, postData: any, formStatus: string, id: any){

    const filePath = `postIMG/${Date.now()}`;

   //uploading image file path
    this.storage.upload(filePath, selectedImage).then(() => {
       this.storage.ref(filePath).getDownloadURL().subscribe(URL =>{
        postData.postImgPath = URL;
         
        if(formStatus == 'Edit'){
          this.updateData(id, postData);
        }else{
          this.saveData(postData);
        }

       
        
       })
    })
    
  }

  //saving data into the fire store
  saveData(postData: any){
    this.afs.collection('posts').add(postData).then(docRef => {
      this.toastr.success('Data stored successfully');
      this.router.navigate(['/posts']);
    });
  }


  // loading post from firebase
  loadData(){
    return this.afs.collection('posts')
     .snapshotChanges()
     .pipe(map(actions => {
      return actions.map(a => {
        //console.log(a);
        
         const data = a.payload.doc.data();
         const id = a.payload.doc.id;
         return {id, data};
       });
     }));
    }

     //loading one data from firebase
    loadOneData(id: any){
      //return this.afs.doc(`post/${id}`).valueChanges();
      return this.afs.collection('posts').doc(id).valueChanges();
    }


    updateData(id: string,postData: Partial<unknown>){
      this.afs.collection('posts').doc(id).update(postData).then(() => {
        this.toastr.success("Data updated successfully");
        this.router.navigate(['/posts']);
      })
    }

    daleteImage(postImgPath, id){
      this.storage.storage.refFromURL(postImgPath).delete().then(() =>{
          this.deleteData(id);
      })
    }
    
    deleteData(id){
      this.afs.collection('posts').doc(id).delete().then(() =>{
        this.toastr.warning('Data Deleted');
      })
    }

    markfeafured(id, featuredData){
      this.afs.collection('posts').doc(id).update(featuredData).then(() =>{
        this.toastr.info('Featured Status Updated');
      })
    }

}
