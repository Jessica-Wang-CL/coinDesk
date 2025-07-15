import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrencyService } from 'src/app/service/currency.service';
import { TransformedCurrency } from 'src/app/service/exchange-rate.service';

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
    public data: { isNew: boolean; editCurrency: TransformedCurrency, originalCurrencyList: TransformedCurrency[] }
  ) {}

  ngOnInit(): void {
    this.initData();
  }

  private initData(): void {
  const isNew = this.data.isNew;
  const editCurrency = this.data.editCurrency;

  this.form = this.fb.group({
    currency: [{
      value: isNew ? '' : editCurrency.currency,
      disabled: !isNew
    }],
    chineseName: [isNew ? '' : editCurrency.chineseName],
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
      this.showWarning('請將必填欄位填好！');
      return;
    }

    const currencyValue = this.form.get('currency')?.value;
    const isDuplicated = this.data.originalCurrencyList.some(item => item.currency === currencyValue)
    if (this.data.isNew && isDuplicated) {
      this.showWarning('設定重複幣別請修正!');
      return;
    }

    this.currencyService.createOrUpdate(this.form.getRawValue()).subscribe(() => {
      this.showSuccess();
      this.dialogRef.close();
    });
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  private showSuccess(): void {
      this.snackBar.open('儲存成功！', '關閉', {
      duration: 3000,
      panelClass: ['success-snackbar'], // 可自訂樣式
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  private showWarning(text: string): void {
    this.snackBar.open(text, '關閉', {
      duration: 3000,
      panelClass: [], // 自訂警告樣式
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
