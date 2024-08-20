import { Search } from "lucide-react";
import React from "react";

const SearchSection = ({onSearchInput}:any) => {
  return (
    <div
      className="p-10 bg-gradient-to-br from-purple-500 flex-col
    via-purple-700 to-blue-500 flex justify-center items-center text-white"
    >
      <h2 className="text-3xl font-bold">Browse All Templates</h2>
      <p>What would you like to create today?</p>
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-2 items-center bg-white 
        p-2 border rounded-md my-5 w-[50%]">
          <Search className="text-primary" />
          <input 
            type="text" 
            className="bg-transparent w-full 
            outline-none text-black" 
            placeholder="search" 
            onChange={(event)=>onSearchInput(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
