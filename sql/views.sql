-- Views for reporting

CREATE VIEW vw_monthly_totals AS
SELECT
  user_id,
  date_trunc('month', date) AS month,
  SUM(amount) AS total
FROM transactions
GROUP BY user_id, date_trunc('month', date);

CREATE VIEW vw_monthly_by_category AS
SELECT
  user_id,
  date_trunc('month', date) AS month,
  category,
  SUM(amount) AS total
FROM transactions
GROUP BY user_id, date_trunc('month', date), category;
