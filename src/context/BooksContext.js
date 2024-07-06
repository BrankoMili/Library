import { createContext, useState } from "react";

export const BooksContext = createContext();

const initialState = {
  books: [],
  pageInfo: {},
  authors: [],
  loading: true,
  error: null
};

const BooksContextProvider = ({ children }) => {
  const [booksState, setBooksState] = useState(initialState);

  return (
    <BooksContext.Provider value={{ booksState, setBooksState }}>
      {children}
    </BooksContext.Provider>
  );
};

export default BooksContextProvider;
