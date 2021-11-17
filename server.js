require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { log } = require('console');

const app = express();
app.set('view engine', 'ejs');



app.get('/', (req, res)=>{

let url = `https://api.spoonacular.com/recipes/random/?apiKey=${process.env.APIKEY}`;
    axios.get(url)
    .then((response) =>{
     
        let recipe ={
            title: response.data.recipes[0].title,
            image: response.data.recipes[0].image,
            inst: response.data.recipes[0].instructions,
            ingredients:[{
                name: "",
                ammount: "",
                unit: "",
            }],
            summary: response.data.recipes[0].summary
        }
        for (let i = 0; i < response.data.recipes[0].extendedIngredients.length; i++) {
            recipe.ingredients[i]={    
                name: response.data.recipes[0].extendedIngredients[i].name,
                ammount: response.data.recipes[0].extendedIngredients[i].measures.metric.amount,
                unit: response.data.recipes[0].extendedIngredients[i].measures.metric.unitShort
              }
            
              
          }

          

        res.render('index', {dataFromSpoon: recipe})
    })
    .catch(error => {
        console.log(error);
    }) 



});


app.listen(process.env.PORT, () => {
console.log('app running on 5000');

});



