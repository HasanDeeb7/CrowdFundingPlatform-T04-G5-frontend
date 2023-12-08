// import React, { createContext, useContext, useState } from 'react';

// const FilterContext = createContext();

// export const FilterProvider = ({ children }) => {
//   const [activeFilter, setActiveFilter] = useState(null);

//   const handleFilterClick = (filter) => {
//     setActiveFilter(filter);
//   };

//   return (
//     <FilterContext.Provider value={{ activeFilter, handleFilterClick }}>
//       {children}
//     </FilterContext.Provider>
//   );
// };

// export const useFilterContext = () => {
//   return useContext(FilterContext);
// };
