'use client';
import { sortBlogs } from "../../utils";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

const FeaturedPosts = ({ blogs }) => {
  const sortedBlogs = sortBlogs(blogs);
  // Get posts 1-4 for the featured grid (first post is in hero section)
  const featuredBlogs = sortedBlogs.slice(1, 15);

  return (
    <section className="w-full max-w-[1180px] mx-auto px-5 sm:px-6 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featuredBlogs.map((blog, index) => {
          // Format date to match Apple's style: "16 April 2025"
          const formattedDate = format(new Date(blog.publishedAt), "d MMMM yyyy");
          
          // Determine if the tag is an update type
          const isUpdate = blog.tags[0].toLowerCase().includes('update') || 
            blog.tags[0].toLowerCase() === 'press release' || 
            blog.tags[0].toLowerCase() === 'quick read';
          
          return (
            <article 
              key={index} 
              className="overflow-hidden rounded-2xl bg-white dark:bg-[#1d1d1f] shadow-sm"
            >
              <div className="flex flex-col h-full">
                {/* Image container */}
                <div className="aspect-[16/9] overflow-hidden">
                  <Link href={blog.url}>
                    <Image
                      src={blog.image.filePath.replace("../public", "")}
                      placeholder="blur"
                      blurDataURL={blog.image.blurhashDataUrl}
                      alt={blog.title}
                      width={600}
                      height={338}
                      className="w-full h-full object-cover object-center"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    />
                  </Link>
                </div>
                
                {/* Content container */}
                <div className="p-6 flex flex-col flex-grow">
                  {isUpdate && (
                    <div className="mb-3">
                      <span className="text-xs uppercase font-semibold tracking-wider text-[#6e6e73] dark:text-[#86868b]">
                        {blog.tags[0]}
                      </span>
                    </div>
                  )}
                  
                  <Link href={blog.url}>
                    <h3 className="text-xl font-semibold text-[#1d1d1f] dark:text-white leading-tight mb-3 hover:text-[#0066CC] transition-colors duration-300">
                      {blog.title}
                    </h3>
                  </Link>
                  
                  <p className="text-sm text-[#424245] dark:text-[#86868b] mb-4 line-clamp-2">
                    {blog.description}
                  </p>
                  
                  <span className="mt-auto text-[#6e6e73] dark:text-[#86868b] text-sm">
                    {formattedDate}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedPosts;
