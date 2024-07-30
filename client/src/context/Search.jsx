import axios from "axios";
import { useContext, useState, createContext,useEffect  } from "react";

const SearchContext=createContext(null);



const SearchProvider=({children})=>{
      const [search,setSearch]=useState({
           keyword:"",
           results:[]
      });

      return (
            <SearchContext.Provider value={[search,setSearch]}>
                {children}
            </SearchContext.Provider>
      )
}

const useSearch=()=>useContext(SearchContext)
export {useSearch, SearchProvider}