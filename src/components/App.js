import React, { useState} from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });
  

  const onAdoptPet = (id)=> {
    const adoptedpets=pets.map((pet)=>{ if(pet.id === id){
      return {...pet, "isAdopted" : true}
     }else{
       return pet
      }})
    setPets(adoptedpets)
  }

  function handleFilter(filter){
    setFilters({type: filter})     
  }

  function handleClick(){
    if(filters.type === 'all'){
      fetch(`http://localhost:3001/pets`)
      .then((res)=>res.json())
      .then((data)=>setPets(data))
    }else{
      fetch(`http://localhost:3001/pets?type=${filters.type}`)
      .then((res)=>res.json())
      .then((data)=>setPets(data))
    }    
    
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={handleFilter} onFindPetsClick={handleClick}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
