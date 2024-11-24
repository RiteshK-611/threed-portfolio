"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useGlowingBall } from "@/context/GlowingBallContext";
import Link from "next/link";

const BlogCard = ({ post }) => {
  const { node } = post;
  const { setIsHovering, setText } = useGlowingBall();

  const handleMouseEnter = () => {
    setIsHovering(true);
    setText("View");
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setText("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <Link href={node.url} target="_blank" rel="noopener noreferrer"
        className="bg-tertiary rounded-[20px] px-2 min-h-[280px] flex flex-col cursor-pointer group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="aspect-[1.9/1] mb-4 overflow-hidden rounded-lg">
          <img
            src={node.coverImage.url}
            alt={node.title}
            className="rounded-lg w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-in-out"
          />
        </div>
        <h3 className="text-white font-bold text-xl md:text-2xl">
          {node.title}
        </h3>
        <p className="text-white-600 text-base mt-2 line-clamp-3">
          {node.brief}
        </p>
        <p
          className="mt-4 text-white-700 font-semibold self-start hover:underline flex items-center gap-2"
        >
          Read More{" "}
          <img
            src="/assets/right-arrow.png"
            alt="arrow"
            className="w-4 h-4 group-hover:translate-x-2 transition-all duration-500 ease-in-out"
          />
        </p>
      </Link>
    </motion.div>
  );
};

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `
          query {
            publication(host: "riteshkokam.hashnode.dev") {
              posts(first: 3) {
                edges {
                  node {
                    coverImage {
                      url
                    }
                    title
                    brief
                    url
                    slug          
                    publishedAt
                  }
                }
              }
            }
          }
        `;

        const response = await fetch("https://gql.hashnode.com/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        const data = await response.json();
        setPosts(data.data.publication.posts.edges);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="c-space my-20">
      <p className="head-text">My Latest Thoughts</p>
      <div className="mt-20 flex flex-col md:flex-row gap-8">
        {loading ? (
          <p className="text-secondary">Loading blog posts...</p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <BlogCard key={post.node.slug} post={post} />
          ))
        ) : (
          <p className="text-secondary">No blog posts found.</p>
        )}
      </div>
    </section>
  );
};

export default Blogs;
