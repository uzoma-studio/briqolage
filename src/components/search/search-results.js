import React, { useState, useEffect, useCallback } from 'react'
import { client } from '../../client'
import '../../styles/screen.css';
import SearchPage from './SearchPage';


const SearchResult = () => {
  const [isArtworkLoading, setIsArtworkLeading] = useState(false)
  const [artworkImages, setArtworkImages] = useState([])

  const [blogPosts, setBlogPosts] = useState([])
  const [isBlogLoading, setIsBlogLeading] = useState(false)

  const cleanUpArtworkImages = useCallback((rawData) =>  {
    const cleanArtworks = rawData.map((gallery) => {
      const {sys, fields} = gallery
      const {id} = sys
      const galleryTitle = fields.title
      const galleryDescription = fields.description
      const galleryImage = fields.image.fields.file.url
      const updatedArtworks = {id, galleryTitle, galleryDescription, galleryImage}
      return updatedArtworks

    })

    setArtworkImages(cleanArtworks)
  }, [])

  const getArtworkImages = useCallback(async () => {
    setIsArtworkLeading(true)
      try {
        const response = await client.getEntries({ content_type: 'artworks' })
        const responseData = response.items
        if (responseData) {
          cleanUpArtworkImages(responseData)
        } else {
          setArtworkImages([])
        }
        setIsArtworkLeading(false)
      } catch (error) {
        console.log(error)
        setIsArtworkLeading(false)
      }
    }, [cleanUpArtworkImages])

  useEffect(() => {
    getArtworkImages()
  }, [getArtworkImages])



  const cleanUpBlogPosts = useCallback((rawData) => {
    const cleanBlogPosts = rawData.map((post) => {
      const { sys, fields } = post;
      const { id } = sys;
      const galleryTitle = fields.title;
      const blogBody = fields.body;
      const blogDate = fields.date;
      const galleryImage = fields.coverImage.fields.file.url;
      const updatedBlogPost = { id, galleryTitle, blogBody, blogDate, galleryImage };
      return updatedBlogPost;
    });
  
    setBlogPosts(cleanBlogPosts);
  }, []);

  const getBlogPosts = useCallback(async () => {
    setIsBlogLeading(true);
    try {
      const response = await client.getEntries({ content_type: 'blogPost' });
      const responseData = response.items;
      if (responseData) {
        cleanUpBlogPosts(responseData);
      } else {
        setBlogPosts([]);
      }
      setIsBlogLeading(false);
    } catch (error) {
      console.log(error);
      setIsBlogLeading(false);
    }
  }, [cleanUpBlogPosts]);


  useEffect(() => {
    getBlogPosts();
  }, [getBlogPosts]);



  return (
    <>
    <div className="tc bg-green ma0 pa4 min-vh-100">
        <SearchPage artworkImages={artworkImages}  blogPosts={blogPosts} />
    </div>
    </>
  )
}

export default SearchResult