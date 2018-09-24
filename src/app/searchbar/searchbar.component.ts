import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  searchFormControl = new FormControl('', []);

  ngOnInit() {
  }

  maps = JSON.parse(window.localStorage.getItem('startpage'))['searchbar'];

  onSubmit() {
    let searchVal: string = this.searchFormControl.value;
    let url: string;
    if (searchVal.includes('/')) {
      url = this.fixed(searchVal);
    } else if (searchVal.includes('?')) {
      url = this.search(searchVal);
    }
    this.goTo(url);

  }

  fixed(searchVal: string): string {
    return this.getFromMap(searchVal, '/', 'fixed');
  }

  search(searchVal: string): string {
    return this.getFromMap(searchVal, '?', 'search');
  }

  getFromMap(searchVal: string, delim: string, type: string) {
    let [site, search] = searchVal.split(delim)
    let url: string = this.maps[type][site];
    return url.replace('${search}', search);
  }

  goTo(url: string) {
    let tab = window.open(url, '_blank');
    tab.focus();
    this.searchFormControl.setValue('');
  }

}
