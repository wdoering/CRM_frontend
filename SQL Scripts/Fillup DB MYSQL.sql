-- ========== ========== ========== ========== ========== ========== ========== ========== ========== ========== ========== ========== 
-- ========== ========== ========== ========== ========== ========== ========== ========== ========== ========== ========== ========== 
-- ========== SCRIPT DE POPULAÇÃO DA BASE DE DADOS CRM TRAVELING SALESMAN
-- ========== V 1.0
-- ========== 30/03/2016
-- ========== @AUTHOR WAGNER DOERING
-- ========== @EMAIL: WDOERING@GMAIL.COM
-- ========== 
-- ========== //TODO:
-- ========== VERIFICAR COMO FAZER AS INSERCOES COM PRIMARY KEY SUBENTENDIDA
-- ========== 
-- ========== 
-- ========== 
-- ========== 
-- ========== 
-- ========== 
-- ========== 
-- ========== ========== ========== ========== ========== ========== ========== ========== ========== ========== ========== ========== 
-- ========== ========== ========== ========== ========== ========== ========== ========== ========== ========== ========== ========== 

-- CRM_DB.PRODUCTSIZECATEGORY 


insert into CRM_DB.PRODUCTSIZECATEGORY values(1,'Botas masculinas');
insert into CRM_DB.PRODUCTSIZECATEGORY values(2,'Botas femininas');                 
insert into CRM_DB.PRODUCTSIZECATEGORY values(3,'Camisas masculinas');
insert into CRM_DB.PRODUCTSIZECATEGORY values(4,'Camisas femininas');
insert into CRM_DB.PRODUCTSIZECATEGORY values(5,'Alpargatas masculinas');
insert into CRM_DB.PRODUCTSIZECATEGORY values(6,'Alpargatas femininas');

-- CRM_DB.PRODUCTSIZE 
-- calçados
insert into CRM_DB.PRODUCTSIZE values(1, '34', 1);
insert into CRM_DB.PRODUCTSIZE values(2, '35', 1);
insert into CRM_DB.PRODUCTSIZE values(3, '36', 1);
insert into CRM_DB.PRODUCTSIZE values(4, '37', 1);
insert into CRM_DB.PRODUCTSIZE values(5, '38', 1);
insert into CRM_DB.PRODUCTSIZE values(6, '39', 1);
insert into CRM_DB.PRODUCTSIZE values(7, '40', 1);
insert into CRM_DB.PRODUCTSIZE values(8, '41', 1);
insert into CRM_DB.PRODUCTSIZE values(9, '42', 1);
insert into CRM_DB.PRODUCTSIZE values(10, '43', 1);
insert into CRM_DB.PRODUCTSIZE values(11, '44', 1);
insert into CRM_DB.PRODUCTSIZE values(12, '45', 1);

insert into CRM_DB.PRODUCTSIZE values(13, '34', 2);
insert into CRM_DB.PRODUCTSIZE values(14, '35', 2);
insert into CRM_DB.PRODUCTSIZE values(15, '36', 2);
insert into CRM_DB.PRODUCTSIZE values(16, '37', 2);
insert into CRM_DB.PRODUCTSIZE values(17, '38', 2);
insert into CRM_DB.PRODUCTSIZE values(18, '39', 2);
insert into CRM_DB.PRODUCTSIZE values(19, '40', 2);
insert into CRM_DB.PRODUCTSIZE values(20, '41', 2);
insert into CRM_DB.PRODUCTSIZE values(21, '42', 2);
insert into CRM_DB.PRODUCTSIZE values(22, '43', 2);
insert into CRM_DB.PRODUCTSIZE values(23, '44', 2);
insert into CRM_DB.PRODUCTSIZE values(24, '45', 2); 	

-- Roupas
insert into CRM_DB.PRODUCTSIZE values(25, 'PP', 3);
insert into CRM_DB.PRODUCTSIZE values(26, 'P', 3);
insert into CRM_DB.PRODUCTSIZE values(27, 'M', 3);
insert into CRM_DB.PRODUCTSIZE values(28, 'G', 3);
insert into CRM_DB.PRODUCTSIZE values(29, 'GG', 3);

insert into CRM_DB.PRODUCTSIZE values(30, 'PP', 4);
insert into CRM_DB.PRODUCTSIZE values(31, 'P', 4);
insert into CRM_DB.PRODUCTSIZE values(32, 'M', 4);
insert into CRM_DB.PRODUCTSIZE values(33, 'G', 4);
insert into CRM_DB.PRODUCTSIZE values(34, 'GG', 4);

-- Product Types TABLE
-- //TODO Table not created yet
insert into CRM_DB.productType values(1,'calçado');
insert into CRM_DB.productType values(2,'camisa');
insert into CRM_DB.productType values(3,'calça');
-- Manufacturers
insert into CRM_DB.manufacturer values (1,'campeiro');
insert into CRM_DB.manufacturer values (2,'Strassburger');
insert into CRM_DB.manufacturer values (3,'Sete Léguas');


-- id,description typeID, manufacturerID, categoryID
insert into CRM_DB.PRODUCT values(1,'bota de couro', 1, 3, 1);
insert into CRM_DB.PRODUCT values(2,'bota de couro 2', 2, 3, 1);
insert into CRM_DB.PRODUCT values(3,'bota de couro 3', 3, 3, 1);
insert into CRM_DB.PRODUCT values(4,'bota de couro 4', 1, 3, 1);
insert into CRM_DB.PRODUCT values(5,'bota de couro 5', 2, 3, 1);

insert into CRM_DB.PRODUCT values(6,'Alpargatas de couro', 1, 2, 1);
insert into CRM_DB.PRODUCT values(7,'Alpargatas de couro', 1, 2, 1);
insert into CRM_DB.PRODUCT values(8,'Alpargatas de couro', 1, 2, 1);
insert into CRM_DB.PRODUCT values(9,'Alpargatas de couro', 1, 2, 1);
insert into CRM_DB.PRODUCT values(10,'Alpargatas de couro', 1, 2, 1);
insert into CRM_DB.PRODUCT values(11,'Alpargatas de couro', 1, 2, 1);

insert into CRM_DB.PRODUCT values(12,'bota de couro', 1, 1, 1);
insert into CRM_DB.PRODUCT values(13,'camisa de algodão', 1, 1, 1);
insert into CRM_DB.PRODUCT values(14,'camisa de algodão', 1, 1, 1);
insert into CRM_DB.PRODUCT values(15,'camisa de algodão', 1, 1, 1);
insert into CRM_DB.PRODUCT values(16,'camisa de algodão', 1, 1, 1);
insert into CRM_DB.PRODUCT values(17,'camisa de algodão', 1, 1, 1);







