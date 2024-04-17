const app = require('express');
const http = require('http').Server(app);

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://aniketmrindhe:root@newsdatas.l8dyoj7.mongodb.net/?retryWrites=true&w=majority")

const newsdatas = require('./models/userModel');

async function insert() {
    try {
        // Delete all documents from the collection
        await newsdatas.deleteMany({});
        
        // Fetch the latest news data from the API
        const myPosts = await fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=15c67e5f0742490ab70606684d6768e0");
        let response = await myPosts.json();
        response = response.articles;
        
        // Insert the latest data into the database
        for (let i = 0; i < response.length; i++) {
            const post = new newsdatas({
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

insert();

http.listen(3030, function(){
    console.log("server is running");
});