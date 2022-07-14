CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    url character varying(2000) NOT NULL,
    method character varying(10),
    body character varying(30000) DEFAULT '',
    cron character varying(50)
);