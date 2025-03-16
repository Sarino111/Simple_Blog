
'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

// types
import { ExtractDataBlog } from '@/utils/types/types';

interface BlogContextType {
  dataBlog: ExtractDataBlog[];
  currentPage: number;
  setDataBlog: (data: ExtractDataBlog[]) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: ReactNode }) => {

  const [dataBlog, setDataBlog] = useState<ExtractDataBlog[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <BlogContext.Provider value={{
      dataBlog,
      currentPage,
      setDataBlog,
      setCurrentPage,
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlogContext must be used within a BlogProvider');
  }
  return context;
};
