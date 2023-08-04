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
    this.handleInput();
  }

  public toggleEdit() {
    this.isEditing = !this.isEditing;
    this.selectedUuids.clear()
  }


  public onUuidClick(uuid: string) {
    if (this.isEditing) {
      if (this.selectedUuids.has(uuid)) {
        this.selectedUuids.delete(uuid); // Deselect the uuid if already selected
        console.log(this.selectedUuids);
      } else {
        this.selectedUuids.add(uuid); // Select the uuid if not already selected
        console.log(this.selectedUuids);
      }
    } else {
      // Handle regular click on mail items
      // For example, navigate to a mail details page
    }
  }

  public deleteSelectedUuids() {

    this.uuids = new Set([...this.uuids].filter((uuid) => !this.selectedUuids.has(uuid)));
    this.handleInput();
    this.storage.set("uuids",this.uuids);

    // Clear the selected UUIDs set after deletion
    this.selectedUuids.clear();
    this.isEditing = false; // Exit edit mode after deleting UUIDs

    console.log(this.uuids);
  }


  public deleteUuid(uuid: string) {
    this.uuids.delete(uuid);
    this.handleInput();
    this.storage.set("uuids",this.uuids);
  }

  public async addUuid() {
    if (!this.uuids.has(this.newUuid)) {
      this.uuids.add(this.newUuid);
      this.filteredUuids.add(this.newUuid);
      this.storage.set("uuids",this.uuids);
      console.log('UUID added:', this.newUuid);
    } else {
      const alert = await this.alertController.create({
        header: 'Duplicate UUID',
        message: 'This UUID already exists.',
        buttons: ['OK'],
      });
      await alert.present();
      console.log('UUID already exists:', this.newUuid);
    }
    this.newUuid = "";
  }

  public checkForEnter(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.newUuid.trim() !== '') {
      this.addUuid();
    }
  }

  handleInput() {
    this.filteredUuids = new Set([...this.uuids].filter((d) => d.toLowerCase().indexOf(this.searchTerm) > -1));
  }

}
