-- 1. Xem danh sách đơn hàng
-- -- 1.1 1.2 1.3
-- SELECT name,email,phone FROM copycustomer;

-- -- 1.4 1.5 1.6
-- SELECT name,email,phone,(SELECT product_price, total_quantity, status, time_order, total_quantity*product_price as total_money FROM productdetails
-- JOIN products ON products.id = productdetails.product_id
-- JOIN orders ON orders.id = productdetails.order_id) FROM copycustomer

SELECT 
    cc.name,
    cc.email,
    cc.phone,
    p.product_price,
    o.total_quantity,
    o.status,
    o.time_order,
    (pd.product_quantity * p.product_price) AS total_money
FROM 
    copycustomer cc
JOIN 
    orders o ON cc.id = o.customers_id
JOIN 
    productdetails pd ON o.id = pd.order_id
JOIN 
    products p ON pd.product_id = p.id;


-- 2. Xem chi tiết đơn hàng
-- -- 2.1 2.2 2.3
-- SELECT name,email,phone FROM copycustomer;

-- -- 2.4
-- SELECT product_name, product_code, product_price, product_quantity, product_price*product_quantity as total_money_product FROM productdetails
-- JOIN products ON products.id = productdetails.product_id

-- -- 2.5 2.6 2.7
-- SELECT status, time_order, last_updated FROM orders

SELECT 
    cc.name,
    cc.email,
    cc.phone,
    p.product_name,
    pd.product_code,
    p.product_price,
    pd.product_quantity,
    (p.product_price * pd.product_quantity) as total_money_product,
    o.status,
    o.time_order,
    o.last_updated
FROM 
    copycustomer cc
JOIN 
    orders o ON cc.id = o.customers_id
JOIN 
    productdetails pd ON o.id = pd.order_id
JOIN 
    products p ON pd.product_id = p.id;
