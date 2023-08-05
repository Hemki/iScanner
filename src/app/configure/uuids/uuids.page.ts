import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/shared/storage/storage.service';
import { Uuid, StringOfLengthError, NotStringError, InvalidCharacterError } from 'src/app/services/shared/types/uuid';

@Component({
  selector: 'app-uuids',
  templateUrl: './uuids.page.html',
  styleUrls: ['./uuids.page.scss'],
})
export class UuidsPage implements OnInit {

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

  // Ensuring that the UUID does not already exist, that it has a valid length and that it only contains hexadecimal digits
  private validateInput(uuid: string): string {

    // uniformly transform input
    const uniformUuid = uuid.toLowerCase().trim().replace(/[^a-zA-Z0-9 ]/g, '');

    if (this.uuids.has(uniformUuid)) {
      throw new Error("This UUID already exists");
    }

    try {
      const validUuid = Uuid(uniformUuid)
      return validUuid;
    } catch (error) {
      if (error instanceof StringOfLengthError || error instanceof NotStringError || error instanceof InvalidCharacterError) {
        throw error;
      } else {
        console.error(error);
        throw new Error("Internal Error 01");
      }
    }

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
    this.storage.set("uuids", this.uuids);

    // Clear the selected UUIDs set after deletion
    this.selectedUuids.clear();
    this.isEditing = false; // Exit edit mode after deleting UUIDs
  }

  // Delete a single UUID from the Set and update afterwards
  public deleteUuid(uuid: string) {
    this.uuids.delete(uuid);
    this.filterUuids();
    this.storage.set("uuids", this.uuids);
  }

  // Add a single UUID to the Set (+ update) only if validate input does not throw an error
  public async addUuid() {
    try{
      const validUuid = this.validateInput(this.newUuid)
      this.uuids.add(validUuid);
      this.filteredUuids.add(validUuid);
      this.storage.set("uuids", this.uuids);
    } catch (error) {
      if (error instanceof Error) {
        const alert = await this.alertController.create({
          header: 'Invalid UUID',
          message: error.message,
          buttons: ['OK'],
        });
        await alert.present();
      } else {
        console.error(error);
      } 
    }
    this.newUuid = "";
  }

  // Also allow to add UUIDs using the Keyboard
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
