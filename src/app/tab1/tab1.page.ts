import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private router: Router) {}

  goToUuidsPage() {
    this.router.navigateByUrl('/tabs/tab3');
  }

  // This will come from a service eventually
  public uuids : boolean = false;

}
