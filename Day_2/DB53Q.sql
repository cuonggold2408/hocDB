-- 1. Xem danh sách đơn hàng
-- 1.1 1.2 1.3
SELECT name,email,phone FROM copycustomer;

-- 1.4 1.5 1.6
SELECT product_price, total_quantity, status, time_order, total_quantity*product_price as total_money FROM productdetails
JOIN products ON products.id = productdetails.product_id
JOIN orders ON orders.id = productdetails.order_id

-- 2. Xem chi tiết đơn hàng
-- 2.1 2.2 2.3
SELECT name,email,phone FROM copycustomer;

-- 2.4
SELECT product_name, product_code, product_price, product_quantity, product_price*product_quantity as total_money_product FROM productdetails
JOIN products ON products.id = productdetails.product_id

-- 2.5 2.6 2.7
SELECT status, time_order, last_updated FROM orders
