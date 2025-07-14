import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrencyService } from 'src/app/service/currency.service';
import { CurrencyRate } from 'src/app/service/exchange-rate.service';

@Component({
  selector: 'app-add-currency-dialog',
  templateUrl: './add-currency-dialog.component.html',
  styleUrls: ['./add-currency-dialog.component.scss'],
})
export class AddCurrencyDialogComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private currencyService: CurrencyService,
    private dialogRef: MatDialogRef<AddCurrencyDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { isNew: boolean; editCurrency: CurrencyRate }
  ) {}

  ngOnInit(): void {
    this.initData();
  }

  private initData(): void {
    this.form = this.fb.group({
      currency: [this.data.isNew ? '' : this.data.editCurrency.currency],
      chineseName: [this.data.isNew ? '' : this.data.editCurrency.chineseName],
    });
  }

  public trimInput(controlName: string): void {
    const control = this.form.get(controlName);
    if (control && typeof control.value === 'string') {
      control.setValue(control.value.trim());
    }
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
