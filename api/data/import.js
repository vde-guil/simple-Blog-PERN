require('dotenv').config();

const categories = require('./categories.json');
const posts = require('./posts.json');
const Post = require('../app/model/Post');
const Category = require('../app/model/Category');
const db = require('../app/database');


(async () => {

    console.log('deleting datas...');
    await db.query(`DELETE FROM post`);
    await db.query(`DELETE FROM category`);

    console.log('inserting new datas...');

    for (const category of categories) {
        let cat = new Category({ label: category.label, route: category.route });

        await cat.insert();

        const postTab = posts.reduce((postTab, curPost) => {

            if (curPost.category === cat.label) {
                postTab.push(new Post({
                    title: curPost.title,
                    slug: curPost.slug,
                    excerpt: curPost.excerpt,
                    content: curPost.content,
                    category_id: cat.id,

                }));
                return postTab;
            }
            return postTab;
        }, []);

        for (const curPost of postTab) {
            await curPost.insert()
        }

    }
})();
