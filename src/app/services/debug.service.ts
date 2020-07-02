import { Injectable, NgZone } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DebugService {

  constructor(private zone: NgZone) {
    window[`qrScan`] = this;
  }

  onScanSuccess: (code: string) => any;

  /**
   * devs calls this from console to simulate scan
   */
  scan(code: string) {
    if (this.onScanSuccess) {
      this.zone.run(() => this.onScanSuccess(code));
    }
  }
}
