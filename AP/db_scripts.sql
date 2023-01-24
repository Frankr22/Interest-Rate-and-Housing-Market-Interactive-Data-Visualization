create table rates
(ID INT PRIMARY KEY NOT NULL,
 time_period char(10),
 mean_price int 
);

CREATE TABLE interest_rates (
  id SERIAL PRIMARY KEY,
  date DATE,
  change_pct VARCHAR(20),
  cash_rate_pct VARCHAR(20)
);

CREATE TABLE aus_dwelling_mean (
  id SERIAL PRIMARY KEY,
  date DATE,
  aus_mean_price VARCHAR(20),
  nsw_mean_price VARCHAR(20),
  vic_mean_price VARCHAR(20),
  qld_mean_price VARCHAR(20),
  sa_mean_price VARCHAR(20),
  wa_mean_price VARCHAR(20),
  tas_mean_price VARCHAR(20),
  nt_mean_price VARCHAR(20),
  act_mean_price VARCHAR(20)
);
