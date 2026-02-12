DROP TABLE IF EXISTS products;

CREATE TABLE products (
    'ID' int(1) NOT NULL DEFAULT '0',
    'Name' varchar(30) DEFAULT NULL,
    'Price' float(6) DEFAULT "25.00",
    'Color' varchar(15) DEFAULT "White",
    'Pattern' varchar(30) DEFAULT "Blank",
    'Brand' varchar(30) DEFAULT "3-Shirts",
    'Size' varchar(30) DEFAULT "Medium",
    'Image' varchar(100) DEFAULT NULL,
    PRIMARY KEY ('ID')
);