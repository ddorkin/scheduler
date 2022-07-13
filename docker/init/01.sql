CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    url character varying(255) NOT NULL,
    method character varying(255),
    body character varying(255),
    cron character varying(255)
);