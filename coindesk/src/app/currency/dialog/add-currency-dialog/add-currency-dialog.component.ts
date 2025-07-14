import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrencyService } from 'src/app/service/currency.service';

@Component({
  selector: 'app-add-currency-dialog',
  templateUrl: './add-currency-dialog.component.html',
  styleUrls: ['./add-currency-dialog.component.scss'],
})
export class AddCurrencyDialogComponent {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private currencyService: CurrencyService,
    private dialogRef: MatDialogRef<AddCurrencyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isNew: boolean; editCurrency: any }
  ) {
    this.form = this.fb.group({
      currency: [''],
      chineseName: [''],
    });
  }

  public onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.showWarning();
      return;
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  private showWarning(): void {
    this.snackBar.open('請將必填欄位填好！', '關閉', {
      duration: 3000,
      panelClass: [], // 自訂警告樣式
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
