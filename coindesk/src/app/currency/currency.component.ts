import { Component, OnInit } from '@angular/core';
import { Currency } from '../model/currency.interface';
import { CurrencyService } from '../service/currency.service';
import {
  CurrencyRate,
  ExchangeRateService,
} from '../service/exchange-rate.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AddCurrencyDialogComponent } from './dialog/add-currency-dialog/add-currency-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
})
export class CurrencyComponent implements OnInit {
  currencyForm!: FormGroup;
  updatedTime = '';
  disclaimer = '';
  originalCurrencyList: CurrencyRate[] = [];
  isEditable = false;

  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyService,
    private exchangeRateService: ExchangeRateService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initData();
    this.initForm();
  }

  private initData(): void {
    this.currencyService.getAllCurrencies().subscribe((res: Currency[]) => {
      const codeSet = new Set(res.map((item) => item.code));

      this.exchangeRateService.getTransformedRates().subscribe((data) => {
        this.updatedTime = data.updatedTime;
        this.disclaimer = data.disclaimer;
        this.originalCurrencyList = data.currencyList.filter((item) =>
          codeSet.has(item.currency)
        );

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

  private setCurrencyList(data: CurrencyRate[]) {
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
    this.dialog.open(AddCurrencyDialogComponent, {
      width: '400px',
      data: {
        isNew: true,
        editCurrency: null,
      },
    });
  }

  public onEdit(data: CurrencyRate): void {
    this.dialog.open(AddCurrencyDialogComponent, {
      width: '400px',
      data: {
        isNew: false,
        editCurrency: data,
      },
    });
  }

  public onDel(data: CurrencyRate): void {}
}
