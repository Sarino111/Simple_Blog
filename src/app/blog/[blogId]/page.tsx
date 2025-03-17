'use client';

// next
import Image from "next/image";
import { useParams } from 'next/navigation';

// react
import React, { useEffect, useState } from "react";

// context
import { useBlogContext } from '@/context/BlogContext';

// utils
import { getBlogDataAll } from '@/utils/services/blog';
import{ extractDataBlog } from '@/utils/dataExtract';

// components
import LoadingComponent from '@/components/LoadingComponent';
import ErrorComponent from '@/components/ErrorComponent';

// types
import { BlogData, ExtractDataBlog } from '@/utils/types/types';

export default function Page() {
  
  const { blogId } = useParams();

  const { dataBlog } = useBlogContext();

  const [article, setArticle] = useState<ExtractDataBlog | null>(null);
  
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isError, setIsError ] = useState(false);

  const fetchBlogData = async () => {
    setIsLoading(true);

    try {
      const resp = await getBlogDataAll();
      if (resp) {
        const responseData = resp.map((blog: BlogData) => extractDataBlog(blog));
        const found = responseData.find((blog: BlogData) => blog.id === blogId);
        setArticle(found);
        setIsError(false);
      }
    } catch (error) {
      console.error('Error fetching blog data:', error);
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if ( dataBlog.length === 0 ) {
      fetchBlogData();
    } else {
      const curBlog = dataBlog.find((blog) => blog.id.toString() === blogId);
      if ( curBlog ) setArticle(curBlog);
    }
  }, [blogId]);

  function handleRetry() {
    fetchBlogData();
  }

  return (
    <>
      { isLoading || !article ? ( <LoadingComponent/> ) 
      : isError ? ( <ErrorComponent onRetry={handleRetry} /> ) : (
        <main className="min-h-screen w-[80%] max-w-[66rem] mx-auto py-[3.5rem]">

          <article className="space-y-8">
            {/* Header */}
            <header className="space-y-4 pt-[2rem] text-center">
              <h1 className="text-4xl font-bold">{article.title}</h1>
              {article.subtitle && (
                <p className="text-xl text-[#137773] font-[Now-Medium]">{article.subtitle}</p>
              )}
            </header>

            {/* Image */}
            <figure className="relative w-full h-[30rem] mt-[5rem] mb-[6rem]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                quality={50}
                className="object-contain"
              />
            </figure>

            {/* Main content */}
            <section
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

              <div className="flex items-center justify-end space-x-4 mr-[5rem]">
                {/* Profile */}
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={article.profilePicture}
                    alt={article.userName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="font-semibold">{article.userName}</p>
                  <p className="text-sm text-gray-500">{article.created}</p>
                </div>
              </div>

          </article>
        </main>
      )}
    </>
  );
}
