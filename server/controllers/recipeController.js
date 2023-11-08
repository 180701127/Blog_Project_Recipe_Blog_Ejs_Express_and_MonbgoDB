require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/recipe');

/**
 * GET /
 * Homepage 
*/
exports.homepage = async(req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
    const thai = await Recipe.find({ 'category': 'Thai' }).limit(limitNumber);
    const american = await Recipe.find({ 'category': 'American' }).limit(limitNumber);
    const chinese = await Recipe.find({ 'category': 'Chinese' }).limit(limitNumber);

    const food = { latest, thai, american, chinese };

    res.render('index',{ title: 'Cooking Blog - Home', categories, food } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

exports.aboutpage = async(req,res)=>{
  try{
    res.render('about',{title:'About'});
  } catch(error){
    res.status(500).send({message: error.message || "Error Occured" });
  }
}
exports.contactpage = async(req,res)=>{
  try{
    res.render('contact',{title:'Contact'});
  } catch(error){
    res.status(500).send({message: error.message || "Error Occured" });
  }
}


/**
 * GET /categories
 * Categories 
*/
exports.exploreCategories = async(req, res) => {
  try {
    const limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber);
    res.render('categories', { title: 'Cooking Blog - Categoreis', categories } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
}


// async function insertDymmyRecipeData(){
//   try {
//     await Recipe.insertMany(
//       [
//         { 
//           "name": "Veg-Biryani",
//           "description": `Making Vegetable Biryani in pressure cooker is a breeze, if you know the right proportions of liquid to rice and vegetables. 
//         Fret not, this video recipe for veg biryani covers it all and helps yield great results every single time.
//         Growing up, Sunday always was a biryani day for us and one of the best memories of my childhood is opening up that pressure cooker lid to let the flavor of biryani fill our entire house.
//         I prefer using the open pot method for making biryani when I have enough time and resort to making it in pressure cooker when I am pressed for time.
//         source: https://cookingfromheart.com/vegetable-biryani-pressure-cooker/`,
//         "email": "logkumRecipe@gmail.com",
//         "ingredients": [
//           "1 cup Basmati Rice",
//           "1 cup Water",
//           "1 cup coconut Milk",
//           "1/2 cup sliced Onions",
//           "1/2 cup Chopped Tomatoes ((rip))"
//         ], 
//         "category": "Indian", 
//         "image": "Veg-Biryani.jpg"
//       },
//       { 
//         "name": "Onion-Dosa",
//         "description": `An onion dosa is a thin,round,and golden-brown crepe-like creation,typically larger in diameter than traditional dosas.
//         It is characterized by a lacy,slightly crispy texture on the outside,with a soft and slightly tangy interior due to the fermentation of the dosa batter.
//         The surface of the dosa is adorned with a scattering of finely chopped onions and green chilies,providing a visually appealing contrast of colors and textures.
//         As onion dosa cooks on a hot griddle or pan,it emits a tantalizing aroma that combines the earthy fragrance of fermented rice and lentils with the enticing scent of sautéed onions and green chilies.
//         The aroma is savory and inviting,making it hard to resist.
//         Source:https://www.tripadvisor.com/LocationPhotoDirectLink-g295424-d10044409-i481385059-Sangam_Restaurant_Sweets-Dubai_Emirate_of_Dubai.html`,
//         "email": "logkumRecipe@gmail.com",
//         "ingredients": [
//           "1 large onion, finely chopped",
//           "2-3 green chilies, finely chopped (adjust to your spice preference)",
//           "A handful of fresh coriander leaves, chopped",
//           "A pinch of asafoetida (hing)",
//           "Salt to taste."
//         ],
//         "Cooking Instructions":[ 
//           "Oil or ghee for greasing the griddle or pan",
//           "Heat a dosa griddle or non-stick pan on medium-high heat.",
//           "Grease it lightly with oil or ghee.",
//           "Pour a ladleful of dosa batter onto the griddle and spread it in a circular motion to form a thin dosa.",
//           "Sprinkle the finely chopped onions, green chilies, coriander leaves, asafoetida, and salt evenly over the dosa."
//         ],
//         "category": "Indian-2", 
//         "image": "onion-dosa.jpg"
//       },
//       { 
//         "name": "Veg-Burger",
//         "description": `The American Veg Burger starts with a soft and slightly toasted sesame seed bun.
//         It's the perfect vessel to hold all the flavorful components of this burger.
//         At the heart of this burger is a juicy and savory plant-based patty.
//         Made from a blend of ingredients like black beans,chickpeas,quinoa,and spices,the patty is grilled to perfection.Its texture is hearty,and it's packed with umami flavor,providing a satisfying meat-like experience without the meat.
//         On top of the patty,you'll find a colorful array of fresh vegetables.
//         Source: https://www.eatingwell.com/recipe/273358/vegetarian-all-american-portobello-burgers/`,
//         "email": "logkumRecipe@gmail.com",
//         "ingredients": [
//           "4 portobello mushroom caps,gills removed if desired",
//           "Cooking spray",
//           "0.25 teaspoon ground pepper",
//           "2 tablespoons mayonnaise",
//           "1 tablespoon ketchup",
//           "1 tablespoon sweet pickle relish",
//           "4 teaspoons steak sauce",
//           "4 slices American cheese",
//           "4 whole-wheat buns,toasted if desired",
//           "1 cup shredded iceberg lettuce",
//           "4 large tomato slices",
//           "Thinly sliced red onion & pickles."
//         ],
//         "Cooking Instructions":[ 
//           "Preheat grill to medium-high.",
//           "Coat mushrooms with cooking spray and sprinkle with pepper.Grill,turning occasionally,until tender,10 to 12 minutes total.",
//           "Grease it lightly with oil or ghee.",
//           "Meanwhile,mix mayonnaise,ketchup and relish in a small bowl.",
//           "Transfer the mushrooms to a plate and pat dry with paper towels.Brush with steak sauce and top the gill side of each mushroom with a slice of cheese.Return the mushrooms to the grill and cook until the cheese is just melted,about 1 minute more.Serve on buns with the sauce,lettuce,tomatoes and onion and pickles,if desired.",
//         ],
//         "category": "American", 
//         "image": "Veg_Burger_American_Foods.jpg"
//       },
//       {
//         "name": "Rainbow Vegetarian Pad Thai with Peanuts and Basil",
//         "description": `The Rainbow Vegetarian Pad Thai is a visual masterpiece,boasting a dazzling array of colors. From the fiery red and yellow bell peppers to the vibrant orange carrots and the lush green of snap peas and bean sprouts,it's like a work of art on your plate.The heart of this dish is the rice noodles, which serve as a delicate and satisfying base. These translucent noodles are tender yet slightly chewy, providing a perfect canvas for the colorful vegetables and aromatic sauce.Generously scattered throughout, the unsalted peanuts add a delightful crunch to every bite. They bring a nutty richness that complements the dish's other flavors and textures.Fresh basil leaves provide a fragrant and herbaceous note to the dish. Their aromatic essence infuses each forkful with a burst of freshness and a hint of anise-like sweetness. 
//         Chopped peanuts,fresh basil leaves,and lime wedges serve as inviting garnishes.
//         They not only contribute to the dish's aesthetics but also allow for personal customization,enabling you to adjust the flavors to your liking.
//         The Rainbow Vegetarian Pad Thai with Peanuts and Basil is a culinary masterpiece that marries the beauty of Thailand's fresh produce with a symphony of flavors.
//         Source:https://pinchofyum.com/rainbow-vegetarian-pad-thai-with-peanuts-and-basil`,
//         "email": "logkumRecipe@gmail.com",
//         "ingredients": [
//           "4 ounces brown rice noodles* (you can get stir-fry type noodles or Pad Thai noodles – an",
//           "1 zucchini",
//           "1 red pepper",
//           "half a yellow onion",
//           "2 carrots",
//           "Brown rice noodles*",
//           "Egg",
//           "Peanuts",
//           "Fresh herbs"
//         ],
//         "Cooking Instructions":
//         [ 
//           "In a small bowl,whisk together the soy sauce,tamarind paste,brown sugar,lime juice,and sriracha sauce until well combined.",
//           "Bring a large pot of water to a boil.Remove the pot from heat and add the rice noodles.Let them soak for about 5-7 minutes or until they are tender but still slightly firm (al dente).Drain and rinse the noodles with cold water to stop the cooking process.",
//           "Heat the vegetable oil in a large wok or a deep skillet over medium-high heat.Add the minced garlic and sliced red onion.Stir-fry for about 1 minute until fragrant.",
//           "Add the thinly sliced red and yellow bell peppers,julienned carrot,and broccoli florets to the wok.Stir-fry for 3-4 minutes until the vegetables are slightly tender but still crisp."
//         ],
          
//           "category": "Thailand", 
//           "image": "Rainbow-Vegetarian-Pad-Thailand-Recipe.jpg"
//       },
//       {
//         "name": "Chinese-Veg-Noodles",
//         "description": `Noodles is basically a dish of the East Asian region,and it is mostly famous for its spiral shape and quick making process.
//         Where some of them are with healthy soupy variations and the rest of the kind is basically dry.
//         Today’s my vegetable stuffed noodle belongs to the last variation.
//         Even it is a very simple and easy recipe for noodles that anybody can easily make in a few minutes.
//         Just by a quick sauté of boiled noodles with finely chopped or sliced veggies and a perfect touch-up of a few Chinese sauces and seasoning. 
//         Source:https://www.spicypunch.com/veg-noodles-recipe-vegetable-noodles-chowmein/`,
//         "email": "logkumRecipe@gmail.com",
//         "ingredients": 
//         [
//           "For boiling noodles:",
//           "250 gm noodles",
//           "3 cups of water(750 ml)",
//           "1 tsp vegetable oil",
//           "1 tsp salt",
//           "Ingredients after boiling:",
//           "4 cups of water",
//           "2 tsp oil",
//           "Other ingredients for cooking noodles:",
//           "1 onion(square cut)",
//           "1 medium carrot(julienne cut)",
//           "3/4 cup shredded cabbage",
//           "3/4 cup of mixed bell peppers",
//           "3 green chillis",
//           "2 1/2 tsp chopped garlic",
//           "1/2 tsp ginger(chopped)",
//           "5 tbsp chopped spring onion",
//           "2-3 tbsp chopped onion", 
//           "2 tsp vinegar",
//           "2 tsp soya sauce",
//           "2 1/2 tbsp tomato ketchup",
//           "1 tsp pepper",
//           "salt(as required)",
//           "3 tbsp oil"
//         ],
//         "Cooking Instructions":
//         [ 
//           "Take a bowl with 500-600ml water,add salt and oil it and let it boil on high flame",
//           "When the water starts boiling then add a packet of noodles to the water.I don’t break it but you may break the roll into pieces too.",
//           "Once the noodles get cooked al dente(means perfectly cooked but rather soft it is firm). In short, you can easily make it flat between your fingertips but not be mashed.It will take hardly 3-4 mins or may take more as per the thickness of your noodle.",
//           "Then immediately strain it and wash it with 3-4 cups of normal water(at room temperature).",
//           "Let the water completely removed from the noddles.So keep it in the strainer for 10 mins.",
//           "After 10 mins of perfect straining when the water almost removed from the noodles,add 2 tsp of oil to it.",
//           "Mix the oil well with the noodle(it’s a trick) to prevent it from drying and sticking to each other.",
//           "Take a pan put it on high flame,make it hot,pour oil in it.When the oil gets hot,first add chopped ginger,sauté it for 10- 15 sec.",
//           "Then add chopped or minced garlic to the pan and once again sauté it for 10-15 sec.",
//           "Next,add chopped spring onions bulb or just add chopped onion.Sauté it well for hardly 30 secs.",
//           "Then add square-cut onion,stir it nicely and sauté it for a few seconds.Add carrot and cabbage to it and make it sautéed well for a min.",
//           "Lastly,add red green and yellow bell pepper and stir it well for few secs.And then add chopped green chilies too.",
//           "Then add dark soya sauce and vinegar one by one and nicely mix it up with the vegetables.",
//           "Add tomato sauce or ketchup to the pan and sauté it well with the veggies for 1 min.",
//           "Add salt and pepper, mix it well the veggies and nicely stir fry it for few secs.",
//           "Then add the noddles to the pan,give it a good stir to mix it well with veggies,sauces,and seasoning.",
//           "After 1 to 2 mins of continuous frying add chopped spring onion with the noodles and give it a good stir.",
//           "Thereafter,in the same way,with the continuous stir,fry the noodles for 3-4 mins and turn off the heat.Your vegetable noodles or veg chowmein is ready to serve."
//         ],
//         "category": "Chinese", 
//         "image": "Chinese-Veg-Noodles.jpg"
//       },
//       {
//         "name": "PISTO-SPANISH VEGETARIAN STEW",
//         "description": `Pisto,sometimes called Spanish ratatouille,is a simple vegetarian stew that’s perfect for using up your abundance of summer vegetables.
//         Pisto is another one of those recipes that has a multitude of variations.Peppers and tomatoes are essential but you can add a variety of other vegetables,herbs or no herbs,sometimes with cumin,served plain or topped with cheese or eggs.
//         Pisto is often called Spanish ratatouille since the ingredients are so similar.The biggest difference is in the method of cooking.Pisto is most often cooked in one big pan,each vegetable added one by one according to its cooking time whereas ratatouille cooks each vegetable separately and then combines them at the end.For my Spanish vegetable stew I chose to use a combination of red and green peppers,eggplant,onion,garlic,zucchini and crushed tomatoes.
//         I also vastly reduced the quantity of oil in my recipe since I don’t like the greasiness of the pisto I usually get in restaurants.Although the oil does add a lot of flavour,it’s just icky in your mouth.If you love olive oil though feel free to add more to the pan or a drizzle over your pisto when you serve 

//         Source: https://www.cilantroandcitronella.com/pisto-spanish-vegetarian-stew/`,
//         "email": "logkumRecipe@gmail.com",
//         "ingredients": 
//         [
//           "3 tablespoons olive oil, or more to taste",
//           "1 large onion,diced",
//           "8 cloves of garlic,sliced but not too thin so they don’t burn",
//           "1 medium red bell pepper, diced small",
//           "2 medium cubanelle/Italian frying peppers or 1 medium green bell pepper,diced small",
//           "2 medium zucchini,diced about 2 cm / 1 inch",
//           "1 medium eggplant,diced the same as the zucchini",
//           "14 oz (400 gr) can crushed tomatoes",
//           "1 ½ teaspoons salt, or to taste",
//           "Freshly cracked black pepper",
//           "2 tablespoons chopped fresh oregano or 2 teaspoons dried",
//           "Bread for serving"
//         ],
//         "Cooking Instructions":
//         [ 
//           "In a large wide pan heat the olive oil over medium-low heat.Add the onion and fry until beginning to brown then add the garlic and fry until soft.",
//           "Add the red and green peppers and fry,stirring occasionally,until soft.",
//           "Now add the zucchini and fry till soft and finally add the eggplant and fry till soft.",
//           "In goes the can of crushed tomatoes,salt and pepper(if you’re using dried oregano add it now as well),and gently simmer until you have a thick sauce – about 15 minutes.",
//           "Finally,remove the pan from the heat and stir in the fresh oregano.Taste and adjust the salt and pepper if you think it’s necessary.Lots of people add a pinch of sugar if they think the tomatoes are sour but it's totally optional.",
//           "You can serve pisto warm or cold.Serve with bread.You can drizzle with a bit more oil if you like."
//         ],
//         "category": "Spanish", 
//         "image": "Pista_Spanish_Food_VEG.jpg"
//       },
//       {
//         "name": "Mexican Vegetarian Recipes",
//         "description": `Vegetable Quesadillas are a delightful Mexican culinary creation that marries the essence of comfort food with the zest of Mexican flavors.These quesadillas are a symphony of colors and textures,with a medley of thinly sliced bell peppers,zucchini,mushrooms,and red onions sautéed to tender perfection.
//         Vegetarian Tacos are a vibrant and healthful rendition of a beloved Mexican classic.This dish celebrates the simplicity of fresh and wholesome ingredients,with a filling that stars canned black beans,sweet corn kernels,diced tomatoes,and red onions.
//         These components come together in a skillet with ground cumin and chili powder,creating a harmonious blend of smoky,savory,and slightly spicy flavors.The resulting mixture is a fiesta of colors,with the deep black of the beans contrasting against the bright red of the tomatoes and the crisp white of the onions.
//         Source: https://insanelygoodrecipes.com/mexican-vegetarian-recipes/`,
//         "email": "logkumRecipe@gmail.com",
//         "ingredients": 
//         [
//           "Mixican Rice",
//           "Next Level Vegan Enchiladas",
//           "Easy Refried Beans",
//           "Vegan Tacos",
//           "2 medium cubanelle/Italian frying peppers or 1 medium green bell pepper,diced small",
//           "2 medium zucchini,diced about 2 cm / 1 inch",
//           "1 medium eggplant,diced the same as the zucchini",
//           "14 oz (400 gr) can crushed tomatoes",
//           "1 ½ teaspoons salt, or to taste",
//           "Freshly cracked black pepper",
//           "2 tablespoons chopped fresh oregano or 2 teaspoons dried",
//           "Bread for serving"
//         ],
//         "Cooking Instructions":
//         [ 
//           "In a large skillet,heat the olive oil over medium-high heat.",
//           "Add the sliced onions and cook until they become translucent,about 2-3 minutes.",
//           "Spoon a generous portion of the sautéed vegetable mixture over the cheese.",
//           "Sprinkle chopped cilantro on top.",
//           "Heat a non-stick skillet or griddle over medium heat.",
//           "Place the assembled quesadilla in the skillet and cook until the bottom is golden brown and the cheese begins to melt,about 2-3 minutes.",
//           "Remove the quesadillas from the skillet and let them cool slightly.",
//           "Cut each quesadilla into wedges.",
//           "Serve with salsa,sour cream,guacamole,or your favorite condiments.",
//           "Roll up the tortillas and enjoy your delicious vegetarian tacos!"
//         ],
//         "category": "Mexican", 
//         "image": "mexican-food.jpg"

//       }
//     ]);
//   } catch(error){
//     console.log('err' + error)
//   }
// }

// insertDymmyRecipeData();


/**
 * GET /categories/:id
 * Categories By Id
*/
exports.exploreCategoriesById = async(req, res) => { 
  try {
    let categoryId = req.params.id;
    const limitNumber = 20;
    const categoryById = await Recipe.find({ 'category': categoryId }).limit(limitNumber);
    res.render('categories', { title: 'Cooking Blog - Categoreis', categoryById } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 
 
/**
 * GET /recipe/:id
 * Recipe 
*/
exports.exploreRecipe = async(req, res) => {
  try {
    let recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    res.render('recipe', { title: 'Cooking Blog - Recipe', recipe } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 


/**
 * POST /search
 * Search 
*/
exports.searchRecipe = async(req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let recipe = await Recipe.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
    res.render('search', { title: 'Cooking Blog - Search', recipe } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
  
}

/**
 * GET /explore-latest
 * Explplore Latest 
*/
exports.exploreLatest = async(req, res) => {
  try {
    const limitNumber = 20;
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render('explore-latest', { title: 'Cooking Blog - Explore Latest', recipe } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 



/**
 * GET /explore-random
 * Explore Random as JSON
*/
exports.exploreRandom = async(req, res) => {
  try {
    let count = await Recipe.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(random).exec();
    res.render('explore-random', { title: 'Cooking Blog - Explore Random', recipe } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 


/**
 * GET /submit-recipe
 * Submit Recipe
*/
exports.submitRecipe = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-recipe', { title: 'Cooking Blog - Submit Recipe', infoErrorsObj, infoSubmitObj  } );
}

/**
 * POST /submit-recipe
 * Submit Recipe
*/
exports.submitRecipeOnPost = async(req, res) => {
  try {

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.');
    } else {

      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.status(500).send(err);
      })

    }

    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName
    });
    
    await newRecipe.save();

    req.flash('infoSubmit', 'Recipe has been added.')
    res.redirect('/submit-recipe');
  } catch (error) {
    // res.json(error);
    req.flash('infoErrors', error);
    res.redirect('/submit-recipe');
  }
}




