import { useCallback, useState } from "react"
import RecipeCard from "./RecipeCard.jsx"
import Newsletter from "./Newsletter.jsx";
import { useContext } from "react";
import { RecipeContext } from "../Contexts/RecipeContext";


const Recipes = () => {

  const {recipe} = useContext(RecipeContext);

  const [category, setCategory] = useState("All");
  const [searchVal, setSearchVal] = useState('');

  

  const Categorywise = useCallback((e) => {
    setCategory(e.target.value);
  }, [setCategory]);

  const handleSearch = (e)=> {
    setSearchVal(e.target.value);
  }

  const filteredCards = recipe.filter((recipe)=> category == "All" || recipe.type == category).filter((recipe)=> recipe.name.toLowerCase().includes(searchVal.toLowerCase()));

  return (
    <>
    <div className='max-w-7xl mx-auto mt-5 lg:px-8 px-6 flex flex-col'>
      <div className="flex md:flex-row flex-col justify-between items-center sm:items-start gap-2.5 mt-2.5">
        <input type="search" value={searchVal} onInput={handleSearch} className="sm:w-96 w-[90%] max-w-3xl md:py-2.5 py-2 md:px-4 px-2.5 border border-gray-300 rounded-[10px]" placeholder="Search Recipe By Name..." />
        <select name="category" id="category" className="sm:w-60 w-[90%] max-w-3xl md:py-2.5 py-2 md:px-4 px-2.5 border border-gray-300 rounded-[10px]" value={category} onChange={Categorywise}>
          <option value="All">All</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Vegan">Vegan</option>
          <option value="Non-Veg">Non-Veg</option>
          <option value="Dessert">Dessert</option>
          <option value="Lunch">Lunch</option>
          <option value="Chocolate">Chocolate</option>
        </select>
      </div>
      <div className='flex flex-wrap md:justify-start justify-between recipes-parent md:gap-5 gap-2.5 md:mt-10 mt-3'>
        {filteredCards.length > 0 ? (
          filteredCards.map((recipe) => (<RecipeCard key={recipe.name} {...recipe} />))
        ) : (
          <h2 className="text-2xl font-semibold w-full mt-10 sm:text-start text-center">No Recipes Found</h2>
        )}
      </div>
    </div>
    <Newsletter />
    </>
  )
}

export default Recipes