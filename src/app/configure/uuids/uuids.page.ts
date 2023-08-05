import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/shared/storage.service';

@Component({
  selector: 'app-uuids',
  templateUrl: './uuids.page.html',
  styleUrls: ['./uuids.page.scss'],
})
export class UuidsPage implements OnInit{

  uuids: Set<string> = new Set<string>();
  filteredUuids: Set<string> = new Set([...this.uuids]);
  isEditing: boolean = false;
  selectedUuids: Set<string> = new Set<string>();
  newUuid: string = "";
  searchTerm: string = "";

  constructor(private alertController: AlertController, private storage: StorageService) { 
  }

  async ngOnInit(): Promise<void> {
    this.uuids = new Set<string>(await this.storage.get("uuids"));
    this.filterUuids();
  }

  public toggleEdit() {
    this.isEditing = !this.isEditing;
    this.selectedUuids.clear()
  }


  public onUuidClick(uuid: string) {
    if (this.isEditing) {
      if (this.selectedUuids.has(uuid)) {
        this.selectedUuids.delete(uuid); // Deselect the uuid if already selected
      } else {
        this.selectedUuids.add(uuid); // Select the uuid if not already selected
      }
    } else {
      //It should not be possible to click on a uuid withouth isEditing being enabled
      console.error("This shouldn't have happened!")
    }
  }

  public deleteSelectedUuids() {

    // Delete all selected UUIDs from the 
    this.uuids = new Set([...this.uuids].filter((uuid) => !this.selectedUuids.has(uuid)));
    this.filterUuids();
    this.storage.set("uuids",this.uuids);

    // Clear the selected UUIDs set after deletion
    this.selectedUuids.clear();
    this.isEditing = false; // Exit edit mode after deleting UUIDs
  }

  // Delete a single UUID from the Set and update afterwards
  public deleteUuid(uuid: string) {
    this.uuids.delete(uuid);
    this.filterUuids();
    this.storage.set("uuids",this.uuids);
  }

  // Add a single UUID to the Set (+ update) only if it doesn't exist yet
  public async addUuid() {
    if (!this.uuids.has(this.newUuid)) {
      this.uuids.add(this.newUuid);
      this.filteredUuids.add(this.newUuid);
      this.storage.set("uuids",this.uuids);
    } else {
      const alert = await this.alertController.create({
        header: 'Duplicate UUID',
        message: 'This UUID already exists.',
        buttons: ['OK'],
      });
      await alert.present();
      console.error('UUID already exists:', this.newUuid);
    }
    this.newUuid = "";
  }

  // Also allow to add UUIDs usiing the Keyboard
  public checkForEnter(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.newUuid.trim() !== '') {
      this.addUuid();
    }
  }

  // Filter shown UUIDs using the searchbar
  filterUuids() {
    this.filteredUuids = new Set([...this.uuids].filter((d) => d.toLowerCase().includes(this.searchTerm.toLowerCase())));
  }

}
