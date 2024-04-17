import { get } from 'mongoose';
import fetch from 'node-fetch';
import mongoose from 'mongoose';

mongoose.connect("mongodb://127.0.0.1:27017/NewsUpdateData");

const newsSchema = new mongoose.Schema({
        "source": {
          "id": String,
          "name": String
        },
        "author": String,
        "title": String,
        "description": String,
        "url": String,
        "urlToImage": String,
        "publishedAt": Date,
        "content": String

})

const News = mongoose.model('newsdata',newsSchema);

async function getPosts() {
    try {
        // Delete all documents from the collection
        await News.deleteMany({});
        
        // Fetch the latest news data from the API
        const myPosts = await fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=15c67e5f0742490ab70606684d6768e0");
        let response = await myPosts.json();
        response = response.articles;
        
        // Insert the latest data into the database
        for (let i = 0; i < response.length; i++) {
            const post = new News({
                source: {
                    id: response[i]['source'].id,
                    name: response[i]['source'].name
                },
                author: response[i]['author'],
                title: response[i]['title'],
                description: response[i]['description'],
                url: response[i]['url'],
                urlToImage: response[i]['urlToImage'],
                publishedAt: response[i]['publishedAt'],
                content: response[i]['content']
            });

            await post.save();
        }

        console.log('Data inserted successfully.');

    } catch (error) {
        console.error('Error fetching and saving data:', error);
    }
}


getPosts();
