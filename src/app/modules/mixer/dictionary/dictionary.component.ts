import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/_metronic/shared/crud-table/services/http.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent  {
  separator: string = 'tab';
  constructor(private httpService: HttpService){
    this.listGeneratedFiles()
   }
   files: any[] = [];
   dictionary: any;
 
   /**
    * on file drop handler
    */
   onFileDropped($event) {
     this.prepareFilesList($event);
   }
 
   /**
    * handle file from browsing
    */
   fileBrowseHandler(files) {
     console.log(files)
     this.prepareFilesList(files);
   }
 
   /**
    * Delete file from files list
    * @param index (File index)
    */
   deleteFile(index: number) {
     this.files.splice(index, 1);
   }
 
   /**
    * Simulate the upload process
    */
   uploadFilesSimulator(index: number) {
     setTimeout(() => {
       if (index === this.files.length) {
         return;
       } else {
         const progressInterval = setInterval(() => {
           if (this.files[index].progress === 100) {
             clearInterval(progressInterval);
             this.uploadFilesSimulator(index + 1);
           } else {
             this.files[index].progress += 5;
           }
         }, 200);
       }
     }, 1000);
   }
 
   /**
    * Convert Files list to normal array list
    * @param files (Files List)
    */
   prepareFilesList(files: Array<any>) {
     for (const item of files) {
       item.progress = 0;
       this.files.push(item);
     }
     this.uploadFilesSimulator(0);
   }
 
   /**
    * format bytes
    * @param bytes (File size in bytes)
    * @param decimals (Decimals point)
    */
   formatBytes(bytes, decimals?) {
     if (bytes === 0) {
       return '0 Bytes';
     }
     const k = 1024;
     const dm = decimals <= 0 ? 0 : decimals || 2;
     const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
     const i = Math.floor(Math.log(bytes) / Math.log(k));
     return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
   }
   process() {
     const formData = new FormData();
     formData.append('file', this.files[0]);
     this.httpService.postMulti('dictionary/update-library', formData).subscribe((res) => {
      this.files = [];
       this.listGeneratedFiles();
     })
   }
 
   listGeneratedFiles() {
     this.httpService.post('dictionary/generated-files', {}).subscribe((res) => {
       this.dictionary =  res.data[0]
     })
   }

   download(url: string) {
    // this.httpService.download(url).subscribe((res) => {})
    window.open(url, "_blank");
    
     
  }
 }
 
 