'use client';

// next
import Image from "next/image";
import Link from 'next/link';

type BlogDataProps = {
  id: number;
  title : string;
  category: string;
  created: string;
  image: string;
  content: string;
  userName: string;
  profilePicture: string;
};

export default function BlogBox({
  id,
  title,
  category,
  created,
  image,
}: BlogDataProps ) {

  return (
    <div key={id} className="bg-white rounded-lg shadow-lg overflow-hidden group">

      <div className="relative overflow-hidden">
        <div className="relative">
          <Image 
            src={image} 
            alt={title}
            width={400} 
            height={250}
            quality={1}
            className="w-full h-56 object-cover transition-transform duration-2200 group-hover:scale-115"
          />
          <div className="absolute bottom-0 left-0 w-full h-[15%] bg-gradient-to-t from-white to-transparent"></div>
        </div>

        <div className="absolute top-2 left-2 space-y-1">
          <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">Blog</span>
          <span className="bg-blue-300 text-black text-xs font-semibold px-2 py-1 rounded">{category}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-gray-600 text-sm mt-1">{created}</p>
        <Link 
          href={`blog/${id}`} 
          className="flex items-center w-fit text-blue-600 font-semibold mt-2 space-x-2"
        >
          <p>Zobraziť článok</p>
          <div className="flex items-center justify-center h-4 w-4">
            <div className="w-2 h-2 border-r-2 border-t-2 border-blue-600 transform rotate-45"></div>
          </div>
        </Link>
      </div>
    </div>
  );
}
