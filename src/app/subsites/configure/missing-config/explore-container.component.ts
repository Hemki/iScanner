import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent {

  constructor(private navController: NavController) { }

  @Input() action?: string;

  goToSettings() {
    this.navController.navigateForward('/tabs/tab3');
  }

}
