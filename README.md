# \# CoinDesk 匯率轉換與幣別維護系統

# 

# 本專案為使用 Spring Boot 與 Maven 建置的 Java 專案，整合 \[CoinDesk API](https://api.coindesk.com/v1/bpi/currentprice.json)，提供比特幣匯率查詢、資料轉換、新 API 組裝與幣別維護等功能。

# 

# 🔗 GitHub 倉庫連結：\[https://github.com/Jessica-Wang-CL/coinDesk](https://github.com/Jessica-Wang-CL/coinDesk)

# 

# ---

# 

# \## 🔧 技術規格

# 

# \- Java 17

# \- Spring Boot

# \- Maven

# \- Spring Data JPA / OpenJPA

# \- H2 In-Memory Database

# \- JUnit 5 (單元測試)

# \- Spring Scheduler

# \- Mocking API 故障處理

# 

# ---

# 

# \## 📌 功能說明

# 

# 1\. \*\*呼叫 CoinDesk API 並解析資料\*\*

# &nbsp;  - 支援實際 API 呼叫與 Mocking 模式（API 當機時使用固定資料）

# 

# 2\. \*\*資料轉換並組成新 API\*\*

# &nbsp;  - 回傳資料格式包含：

# &nbsp;    - 更新時間（yyyy/MM/dd HH:mm:ss）

# &nbsp;    - 幣別代碼

# &nbsp;    - 幣別中文名稱

# &nbsp;    - 匯率（小數格式）

# 

# 3\. \*\*幣別資料維護（CRUD）\*\*

# &nbsp;  - 幣別代碼與對應中文名稱存放於 H2 資料庫

# &nbsp;  - 提供新增、查詢、修改與刪除功能

# &nbsp;  - 查詢結果依幣別代碼排序

# 

# 4\. \*\*排程任務\*\*

# &nbsp;  - 每天凌晨 12:00 自動同步匯率資料並更新本地快取

# 

# 5\. \*\*單元測試\*\*

# &nbsp;  - 所有主要功能包含單元測試，確保系統穩定性

# 

# ---

# 

# \## 🛠️ 安裝與執行

# 

# \### 前置需求

# 

# \- JDK 17+

# \- Maven 3.8+

# 

# \### 建置與啟動

# 

# ```bash

# \# 下載專案

# git clone https://github.com/Jessica-Wang-CL/coinDesk.git

# cd coinDesk

# 

# \# 執行 Spring Boot 應用程式

# ./mvnw spring-boot:run

# ```

# 

# ---

# 

# \## 🧪 測試

# 

# ```bash

# \# 執行單元測試

# ./mvnw test

# ```

# 

# ---

# 

# \## 📄 幣別資料表 SQL

# 

# 以下為建立幣別與中文名稱對照資料表的 SQL：

# 

# ```sql

# CREATE TABLE currency (

# &nbsp; code VARCHAR(10) PRIMARY KEY,

# &nbsp; name\_zh VARCHAR(50) NOT NULL

# );

# ```

# 

# ---

# 

# \## 🔄 Mocking 資料格式（當 CoinDesk API 無法連線時使用）

# 

# ```json

# {

# &nbsp; "time": {

# &nbsp;   "updated": "Aug 3, 2022 20:25:00 UTC",

# &nbsp;   "updatedISO": "2022-08-03T20:25:00+00:00",

# &nbsp;   "updateduk": "Aug 3, 2022 at 21:25 BST"

# &nbsp; },

# &nbsp; "bpi": {

# &nbsp;   "USD": {

# &nbsp;     "code": "USD",

# &nbsp;     "rate": "23,342.0112",

# &nbsp;     "description": "US Dollar",

# &nbsp;     "rate\_float": 23342.0112

# &nbsp;   },

# &nbsp;   "GBP": {

# &nbsp;     "code": "GBP",

# &nbsp;     "rate": "19,504.3978",

# &nbsp;     "description": "British Pound Sterling",

# &nbsp;     "rate\_float": 19504.3978

# &nbsp;   },

# &nbsp;   "EUR": {

# &nbsp;     "code": "EUR",

# &nbsp;     "rate": "22,738.5269",

# &nbsp;     "description": "Euro",

# &nbsp;     "rate\_float": 22738.5269

# &nbsp;   }

# &nbsp; }

# }

# ```

# 

# ---

# 

# \## 📬 聯絡資訊

# 

# Jessica Wang  

# \[GitHub Profile](https://github.com/Jessica-Wang-CL)

# 

# ---

# 

# \## 🪪 License

# 

# 本專案使用 MIT 授權條款發佈。



