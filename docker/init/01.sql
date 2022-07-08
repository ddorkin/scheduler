CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    url character varying(255) NOT NULL,
    body character varying(255),
    cron character varying(255)
);