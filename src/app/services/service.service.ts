import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

 API_Key = '4926dad3e7a23a83d3e8fab6cc7dae6d'

//  call the weather API from openweathermap

  getWeatherdata(city:any){
   return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.API_Key}&units=metric`)
  }

}


