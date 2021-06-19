const redis = require('redis');

const client = redis.createClient();

const PREFIX = 'blog:';
const PEREMPTION = 60*30; //30MINUTES

const { promisify } = require('util');

const asyncClient = {
    get: promisify(client.get).bind(client),
    del: promisify(client.del).bind(client),
    exists: promisify(client.exists).bind(client),
    setex: promisify(client.setex).bind(client)
};

const keysIndex = [];

const flush = async (req, res, next) => {

    // pour vider le cache, on va boucler sur toutes nos clefs prealablement stockees dans le tableau keyIndex
    //et les effacer
    for (const key of keysIndex) {
        await asyncClient.del(key);
    }
    keysIndex.length = 0;

    
    // on passe a la suite
    next();
}

const cache = async (req, res, next) => {

    
    const url = PREFIX + req.url;

    if (await asyncClient.exists(url)) {
        // si les donnees sont presentes dans le cache
        //on recupere dans le cache
        const cachedValue = await asyncClient.get(url);

        //la cachedValue est une string Json, pas un objet js
        const value = JSON.parse(cachedValue)

        res.json(value);

    } else {
        // on met dans le cache
        
        // mais on a pas encore les donnees du cache, car le middleware de controleur n'a pas encore ete appele. Pour pallier au probleme, on va surcharger la fonction res.json 
        // pour intercepter les donnees au niveau du middleware de controleur, les mettre en cache, puis les envoyer en reponse

        //on met de cote la res.json originale
        const originalResDotJson = res.json.bind(res);

        res.json = async (responseData) => {
            const jsonData = JSON.stringify(responseData);

            await asyncClient.setex(url, PEREMPTION, jsonData);

            // apres la mise en cache, on retient la clef
            keysIndex.push(url);

            originalResDotJson(responseData);
        }

        next();
    }

}

module.exports = {
    flush,
    cache
};