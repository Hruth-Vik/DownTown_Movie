import React from 'react'

const Search = ({searchTerm,setsearchTerm}) => {
  return (
    <div className='search'>
        <div className=''>
            <img src="./search.svg" alt="search" />
            <input type="text" placeholder='Search the Movie' value={searchTerm} onChange={(event)=>
                setsearchTerm(event.target.value)}/>
        </div>
    </div>
  )
}

export default Search
