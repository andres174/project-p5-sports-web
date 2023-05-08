import { Injectable } from '@angular/core';


declare var google:any;
@Injectable({
  providedIn: 'root'
})
export class MapaService {
  mapsLoaded=false;
  constructor() { }

  // init(renderer:any,document:any): Promise<any>{
  //   return new Promise((resolve)=>{
  //     if (this.mapsLoaded) {
  //       console.log('goodle is preview loaded');
  //       resolve(true)
  //       return
  //     }
  //     const script =renderer.createElement('script')
  //     script.id='googleMaps';

  //     window['mapInit'] = () => {
  //       this.mapsLoaded = true;
  //       if(google){
  //         console.log('google is loaded');
  //       } else {
  //         console.log('google is not defined');
  //       }
  //       resolve(true);
  //       return;
  //     }   
  //        script.src='https://maps.googleapis.com/maps/api/js?callback=mapInit'
  //     renderer.appendChild(document.body, script);
  //   })
   

  // }

}
