import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { WeatherDetails } from '../weather-details.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  // Model driven forms

  inputForm = this.fb.group({
    cityName: ['', Validators.pattern('[a-zA-Z]')]
  })

  address = ''

  locationName: any
  temperature: any
  minmunTemperature: any
  maximumTemperature: any
  windSpeed: any
  time: any
  date: any

  cityWeather: WeatherDetails[] = [];

  constructor(private ds: ServiceService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {

  }

  //  google-places-autocomplete method

  public handleAddressChange(address: any) {
    this.address = address.formatted_address;
  }


  // invoke the submit to get the weather details.
  submit() {
    var city = this.inputForm.value.cityName
    this.ds.getWeatherdata(city)
      .subscribe((result: any) => {
        if (result) {
          for (let i = 0; i < result.list.length; i += 8) {
            // console.log("result",result.list);
            const city = new WeatherDetails(
              result.city.name,
              result.list[i].main.temp,
              result.list[i].main.temp_min,
              result.list[i].main.temp_max,
              result.list[i].wind.speed,
              result.list[i].dt_txt,
            )
            console.log("Final display:", city);
            this.cityWeather.push(city)
          }
        }
      },
        (result) => {
          alert(result.error.message);
        }
      )

  }

  clear() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}

