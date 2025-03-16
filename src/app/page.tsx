'use client';

// react
import React, { useEffect, useState } from "react";

// utils
import { getBlogData } from '@/utils/services/blog';
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
  
  const { dataBlog, setDataBlog, currentPage, setCurrentPage } = useBlogContext();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isError, setIsError ] = useState(false);

  const fetchBlogData = async (pageNum: number) => {
    setIsLoading(true);

    try {
      const resp = await getBlogData(pageNum);
      if (resp) {
        const responseData = resp.data.map((blog: BlogData) => extractDataBlog(blog));
        setDataBlog(responseData);
        setIsError(false);
      }
    } catch (error) {
      console.error('Error fetching blog data:', error);
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchBlogData(currentPage);
  }, [currentPage]);

  function handleRetry() {
    fetchBlogData(currentPage);
  }

  function handleNextPage () {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  function handlePrevPage () {
    setCurrentPage((prevPage) => prevPage - 1);
  }
 
  function handleFirstPage () {
    setCurrentPage(1);
  }

  return (
    <>
      { isError ? ( <ErrorComponent onRetry={handleRetry}/> )
      : (
        <main className="min-h-screen w-full flex flex-col items-center justify-center my-[5rem]">
          <h1 className="text-[#039993] text-[2rem] w-full text-center mb-[3rem]">
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
                dataBlog?.map((blog: ExtractDataBlog) => (
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
