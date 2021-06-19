-- Deploy oblog:init to pg

BEGIN;

--create category table

CREATE TABLE category (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    route text NOT NULL UNIQUE,
    label text NOT NULL UNIQUE
);

-- create post table

CREATE TABLE post (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    slug text NOT NULL UNIQUE,
    title text NOT NULL,
    excerpt text NOT NULL,
    content text NOT NULL,
    category_id int NOT NULL REFERENCES category(id)
);

COMMIT;
