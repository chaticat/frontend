import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NotifierComponent } from '../notifier/notifier.component';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackBar: MatSnackBar) {
  }

  showSuccessNotification(displayMessage: string, duration: number) {
    this.snackBar.openFromComponent(NotifierComponent, {
      data: {
        message: displayMessage,
        type: 'success'
      },
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-container']
    });
  }

  showErrorNotification(displayMessage: string, duration: number) {
    this.snackBar.openFromComponent(NotifierComponent, {
      data: {
        message: displayMessage,
        type: 'error'
      },
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-container', 'error']
    });
  }
}
