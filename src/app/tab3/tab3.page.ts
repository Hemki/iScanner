import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/shared/storage/storage.service';
import { RSSIFilter } from '../services/shared/types/rssiFilter';
import { TxParameters } from '../services/shared/types/txParameters';
import { DefaultTxParametersService } from '../services/shared/defaults/defaultTxParameters';
import { DefaultRssiFilterService } from '../services/shared/defaults/defaultRssiFilter';
import { InvalidCharacterError, NotStringError, StringOfLengthError, Uuid } from '../services/shared/types/uuid';
import { AlertController } from '@ionic/angular';

class DuplicateError extends Error { }

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  rssiFilter: RSSIFilter;
  txParameters: TxParameters

  constructor(private router: Router, private storage: StorageService, private defaultTxParametersService: DefaultTxParametersService, private defautlRssiFilterService: DefaultRssiFilterService, private alertController: AlertController) {
    this.txParameters = this.defaultTxParametersService.getDefaultTxParameters();
    this.rssiFilter = this.defautlRssiFilterService.getDefaultRssiValues();
  }

  async ngOnInit(): Promise<void> {
    const storedRssiFilter = await this.storage.get("rssi");
    if (storedRssiFilter) {
      this.rssiFilter = storedRssiFilter;
    }

    const storedTxParameters = await this.storage.get("txParam");
    if (storedTxParameters) {
      this.txParameters = storedTxParameters;
    }
  }

  goToUuidsPage() {
    this.router.navigateByUrl('/tabs/tab3/uuids');
  }

  pinFormatter(value: number) {
    return `-${value}`;
  }

  async updateRssiFilter() {
    await this.storage.set("rssi", this.rssiFilter);
  }

  async updateTxParameters() {
    console.log("TEST")

    try {
      this.validateInput();
    } catch (error) {
      if (error instanceof Error) {
        const alert = await this.alertController.create({
          header: 'Invalid Parameters',
          message: error.message,
          buttons: ['OK'],
        });
        await alert.present();
        return;
      } else {
        console.error(error);
        return;
      }
    }
    await this.storage.set('txParam', this.txParameters);
  }

  private validateInput(): void {

    // uniformly transform uuid input
    const uniformUuid = this.txParameters.uuid.toLowerCase().trim().replace(/[^a-zA-Z0-9 ]/g, '');

    try {
      const validUuid = Uuid(uniformUuid)
      const outputUuid = this.formatUUIDString(validUuid);
      this.txParameters.uuid = outputUuid;
    } catch (error) {
      if (error instanceof StringOfLengthError || error instanceof NotStringError || error instanceof InvalidCharacterError || error instanceof DuplicateError) {
        throw error;
      } else {
        console.error(error);
        throw new Error("Internal Error 01");
      }
    }

    const major = +this.txParameters.major;
    if (isNaN(major)) { throw new Error ("Major must be an integer")} 
    this.txParameters.major = major;

    const minor = +this.txParameters.minor;
    if (isNaN(minor)) { throw new Error ("Minor must be an integer")} 
    this.txParameters.minor = minor;

  }

  private formatUUIDString(uuid: string): string {
  
    const segments = [
      uuid.substring(0, 8),
      uuid.substring(8, 12),
      uuid.substring(12, 16),
      uuid.substring(16, 20),
      uuid.substring(20),
    ];
  
    return segments.join("-");
  }

}
