"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useGlowingBall } from "@/context/GlowingBallContext";
import Link from "next/link";
import axios from "axios";

const BlogCard = ({ post }) => {
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
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            bounce: 0.4,
          },
        },
        hidden: { opacity: 0, y: 50 },
      }}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card">
      <Link
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-tertiary rounded-[20px] px-2 min-h-[280px] flex flex-col cursor-pointer group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <div className="aspect-[1.9/1] mb-4 overflow-hidden rounded-lg">
          <img
            src={post.social_image}
            alt={post.title}
            className="rounded-lg w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-in-out"
          />
        </div>
        <h3 className="text-white font-bold text-xl md:text-2xl">
          {post.title}
        </h3>
        <p className="text-white-600 text-base mt-2 line-clamp-3">
          {post.description}
        </p>
        <p className="mt-4 text-white-700 font-semibold self-start hover:underline flex items-center gap-2">
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
    const fetchDevToPosts = async () => {
      try {
        const response = await axios.get("/api/devto/articles", {
          params: {
            per_page: 3,
            username: "riteshkokam",
          },
        });

        console.log("devto response", response);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching Dev.to posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevToPosts();
  }, []);

  return (
    <section className="c-space my-20" id="blogs">
      <p className="head-text">Latest Thoughts</p>
      <motion.div
        className="mt-20 flex flex-col md:flex-row gap-8 my-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3,
            },
          },
          hidden: {
            opacity: 0,
          },
        }}>
        {loading ? (
          <p className="text-secondary">Loading blog posts...</p>
        ) : posts.length > 0 ? (
          posts.map((post) => <BlogCard key={post.id} post={post} />)
        ) : (
          <p className="text-secondary">No blog posts found.</p>
        )}
      </motion.div>
    </section>
  );
};

export default Blogs;
