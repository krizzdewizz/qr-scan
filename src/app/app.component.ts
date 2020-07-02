import {Component} from '@angular/core';
import {DebugService} from './services/debug.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  output: string;
  url: boolean;
  start = true;

  constructor(private debugService: DebugService) {
    debugService.onScanSuccess = this.onScanSuccess.bind(this);
  }

  onScanSuccess(code: string) {
    if (!this.start) {
      return;
    }
    this.output = code;
    this.url = code.startsWith('http://') || code.startsWith('https://');

    navigator.vibrate(200);
  }

  onFocusOutput(e: FocusEvent) {
    const el = e.target as HTMLTextAreaElement;
    el.select();
  }

  open() {
    window.open(this.output, '_blank');
  }

  async copy() {
    await navigator.clipboard.writeText(this.output);
    navigator.vibrate(200);
  }

  toggleStart() {
    this.start = !this.start;
  }
}
