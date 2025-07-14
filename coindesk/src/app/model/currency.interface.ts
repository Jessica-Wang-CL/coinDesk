export interface Currency {
  code: string;
  chineseName: string;
  rate: string;
  updateTime: string; // 或 Date，如果你打算轉成時間物件處理
}
