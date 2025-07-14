-- schema.sql
CREATE TABLE currency (
    code VARCHAR(10) PRIMARY KEY,
    chinese_name VARCHAR(50) NOT NULL
);

-- data.sql
INSERT INTO currency (code, chinese_name) VALUES
('USD', '美元'),
('EUR', '歐元'),
('GBP', '英鎊');