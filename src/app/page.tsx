'use client';

// react
import React, { useEffect, useState } from "react";

// utils
import { getBlogDataAll } from '@/utils/services/blog';
import{ extractDataBlog } from '@/utils/dataExtract';

// context
import { useBlogContext } from '@/context/BlogContext';

// components
import BlogBox from '@/components/BlogBox';
import LoadingComponent from '@/components/LoadingComponent';
import ErrorComponent from '@/components/ErrorComponent';

// types
import { BlogData, ExtractDataBlog } from '@/utils/types/types'
import Pagination from "@/components/Pagination";

export default function Page() {
  
  const { dataBlog, currentDataPage, setDataBlog, currentPage, setCurrentPage, setCurrentDataPage } = useBlogContext();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isError, setIsError ] = useState(false);
  const articlesPerPage = 12;

  const fetchBlogData = async () => {
    setIsLoading(true);

    try {
      const resp = await getBlogDataAll();
      if (resp) {
        const responseData = resp.map((blog: BlogData) => extractDataBlog(blog));
        const sortedArticles = responseData.sort((a: ExtractDataBlog, b: ExtractDataBlog) => {
          const dateA = new Date(a.createdIso);
          const dateB = new Date(b.createdIso);
          return dateB.getTime() - dateA.getTime();
      });
        const first12Articles = sortedArticles.slice(0, 12);
        setDataBlog(sortedArticles);
        setCurrentDataPage(first12Articles);
        setIsError(false);
      }
    } catch (error) {
      console.error('Error fetching blog data:', error);
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (currentDataPage.length === 0) fetchBlogData();
  }, []);

  function handleRetry() {
    fetchBlogData();
  }

  function handleNextPage() {
    setCurrentPage((prevPage) => {
      const newPage = prevPage + 1;
      
      const startIndex = (newPage - 1) * articlesPerPage;
      const endIndex = newPage * articlesPerPage;
      
      const nextPageArticles = dataBlog.slice(startIndex, endIndex);
      
      setCurrentDataPage(nextPageArticles);

      return newPage; 
    });
  }

  function handlePrevPage() {
    setCurrentPage((prevPage) => {
      if (prevPage > 1) {
        const newPage = prevPage - 1;

        const startIndex = (newPage - 1) * articlesPerPage;
        const endIndex = newPage * articlesPerPage;
        
        const prevPageArticles = dataBlog.slice(startIndex, endIndex);
        
        setCurrentDataPage(prevPageArticles);

        return newPage;  
      }
      return prevPage;
    });
  }
 
  function handleFirstPage () {
    setCurrentPage(1);

    const first12Articles = dataBlog.slice(0, 12);
    setCurrentDataPage(first12Articles);
  }

  return (
    <>
      { isError ? ( <ErrorComponent onRetry={handleRetry}/> )
      : (
        <main className="min-h-screen w-full flex flex-col items-center justify-center my-[5rem]">
          <h1 className="text-[#137773] text-[2rem] w-full text-center mb-[1.5rem]">
            Články na našom blogu
          </h1>
          <div
            className="max-w-[76rem] w-full flex flex-row justify-end"
          >
            <Pagination
              page={currentPage}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              handleFirstPage={handleFirstPage}
            />

          </div>
          <section className="max-w-[76rem] min-h-[60vh] px-[2rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3rem] justify-center">
            { isLoading ? (
              <LoadingComponent/>
              ) : (
                currentDataPage?.map((blog: ExtractDataBlog) => (
                  <BlogBox
                    key={blog.id}
                    id={blog.id}
                    title={blog.title}
                    category={blog.category}
                    created={blog.created}
                    image={blog.image}
                    content={blog.content}
                    userName={blog.userName}
                    profilePicture={blog.profilePicture}
                  />
                ))
              )
            }
          </section>
          <div
            className="max-w-[76rem] w-full flex flex-row justify-end"
          >
            <Pagination
              page={currentPage}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              handleFirstPage={handleFirstPage}
            />
          </div>
        </main>
      )}
    </>
  );
}
