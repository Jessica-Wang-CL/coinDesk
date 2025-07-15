import { Component, OnInit } from '@angular/core';
import { Currency } from '../model/currency.interface';
import { CurrencyService } from '../service/currency.service';
import {
  TransformedCurrency,
  ExchangeRateService,
} from '../service/exchange-rate.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AddCurrencyDialogComponent } from './dialog/add-currency-dialog/add-currency-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
})
export class CurrencyComponent implements OnInit {
  currencyForm!: FormGroup;
  updatedTime = '';
  disclaimer = '';
  originalCurrencyList: TransformedCurrency[] = [];
  isEditable = false;

  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyService,
    private exchangeRateService: ExchangeRateService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.initData();
    this.initForm();
  }

  private initData(): void {
    this.currencyService.getAllCurrencies().subscribe((res: Currency[]) => {
       this.exchangeRateService.getTransformedRates().subscribe((data) => {
        this.updatedTime = data.updatedTime;
        this.disclaimer = data.disclaimer;
        this.originalCurrencyList = res.map(c => {
          const matchingRate = data.currencyList.find(item => item.currency === c.code);

          return {
            currency: c.code,
            chineseName: c.chineseName,
            rate: matchingRate ? matchingRate.rate : null
          } as TransformedCurrency;
        });

        this.setCurrencyList(this.originalCurrencyList);
      });
    });
  }

  private initForm(): void {
    this.currencyForm = this.fb.group({
      currencyList: this.fb.array([]),
    });
  }

  get currencyList(): FormArray {
    return this.currencyForm.get('currencyList') as FormArray;
  }

  private setCurrencyList(data: TransformedCurrency[]) {
    this.currencyList.clear();
    data.forEach((item) => {
      this.currencyList.push(
        this.fb.group({
          currency: [item.currency],
          chineseName: [item.chineseName],
          rate: [item.rate],
        })
      );
    });
  }

  public onFreeze(): void {
    this.isEditable = false;
  }

  public onMaintenance(): void {
    this.isEditable = true;
  }

  public onAdd(): void {
    const dialogRef = this.dialog.open(AddCurrencyDialogComponent, {
      width: '400px',
      data: {
        isNew: true,
        editCurrency: null,
        originalCurrencyList: this.originalCurrencyList,
      },
    });
    dialogRef.afterClosed().subscribe(()=> {
      this.initData();
    });
  }

  public onEdit(data: TransformedCurrency): void {
    const dialogRef = this.dialog.open(AddCurrencyDialogComponent, {
      width: '400px',
      data: {
        isNew: false,
        editCurrency: data,
        originalCurrencyList: [],
      },
    });
    dialogRef.afterClosed().subscribe(()=> {
      this.initData();
    });
  }

  public onDel(data: TransformedCurrency): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: '確認刪除',
        customContent: `確定要刪除幣別 <b>${data.chineseName}</b> 嗎？`
      }
    });
     dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.currencyService.deleteCurrency(data.currency).subscribe(() => {
          this.showDeleteSuccess();
          this.initData();
        })
      }
     })
  }

  private showDeleteSuccess(): void {
    this.snackBar.open('刪除成功！', '關閉', {
      duration: 3000,
      panelClass: ['delete-snackbar'], // 可自訂樣式
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
