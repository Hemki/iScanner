import { Component } from '@angular/core';

@Component({
  selector: 'app-uuids',
  templateUrl: './uuids.page.html',
  styleUrls: ['./uuids.page.scss'],
})
export class UuidsPage {

  uuids: string[] = ["XXXX-XXXX-XXXX-XXXX","YYYY-YYYY-YYYY-YYYY"]
  isEditing: boolean = false; 
  selectedUuids: string[] = [];
  newUuid: string = "";

  constructor() { }

  public toggleEdit() {
    this.isEditing = !this.isEditing;
    this.selectedUuids = [];
  }


  public onUuidClick(uuid: string) {
    if (this.isEditing) {
      const index = this.selectedUuids.indexOf(uuid);
      if (index > -1) {
        this.selectedUuids.splice(index, 1); // Deselect the uuid if already selected
        console.log(this.selectedUuids)
      } else {
        this.selectedUuids.push(uuid); // Select the uuid if not already selected
        console.log(this.selectedUuids)
      }
    } else {
      // Handle regular click on mail items
      // For example, navigate to a mail details page
    }
  }

  public deleteSelectedUuids() {

    this.uuids = this.uuids.filter((uuid) => !this.selectedUuids.includes(uuid));

    // Clear the selected mails array after deletion
    this.selectedUuids = [];
    this.isEditing = false; // Exit edit mode after deleting mails

    console.log(this.uuids)
  }

  public addUuid() {
    if (this.newUuid.trim() !== '') {
      this.uuids.push(this.newUuid); // Add the new mail to the array
      this.newUuid = ''; // Clear the input field after adding the UUID
    }
  }

  public checkForEnter(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.newUuid.trim() !== '') {
      this.addUuid();
    }
  }

}
