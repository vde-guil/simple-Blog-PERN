-- Deploy oblog:better_post to pg

BEGIN;

-- le but d une vue est de creer un format de donnees plus simple
--a utiliser qu un gros select pein de jointure, de filtres et d'agregations

CREATE VIEW post_with_category AS
SELECT post.*, category.label category
FROM post
JOIN category ON post.category_id = category.id;
--partie variable

--pour l utiliser SELECT * FROM ma_vue

COMMIT;
