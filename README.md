# Wine Collection Manager 
Library project from The Odin Project Curriculum 
Built with HTML, Bootstrap, CSS, vanilla JS

## How to use

- Open in browser
- Fill out the form with the correct wine (Make sure you fill out the bottle name and the winery name unless the API can find funny things)
- Submit, and voila! A card with (hopefully) the right bottle picture will be added to your collection.

## How it works

I have made an empty array where each filled form will return an object and be pushed onto the array. The array then will be displayed on the DOM and rerendered whenever something is changed. The array will be saved in local storage, so you are able to use even you close the website. I was also building an API using Google's one, whenever the form is filled out, the program receives the string (the bottle name, winery name, and vintage) what to search for and the API returns a JSON object, where I return the first picture as a result. Because I couldn't figure out how to sort the search to wine related pictures, if the user tries to find something which is not wine, it will still return that.
