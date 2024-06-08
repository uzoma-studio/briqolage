import React, { useState, useEffect } from 'react'

import Window from '../components/window';
import Contentful from '../utils/contentful';

import styles from '../styles/blog.module.css'

import helpers from '../utils/helpers';

export default function Blog() {

  const [ blogPosts, setBlogPosts ] = useState(null)

  const query = `
  query {
    blogPostCollection(limit:10) {
        items {
          title
          body {
            json
            links {
                assets {
                block {
                  sys {
                    id
                  }
                  title
                  url
                }
              }
            }
          }
          date
          coverImage {
              fileName
              url
            }
          }
        }
    }
  `

  useEffect(() => {
    Contentful.get(query)
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        setBlogPosts(data.blogPostCollection.items)

      });
  }, [query]);

  const { formatDate } = helpers

  const [ currentBlogpost, setCurrentBlogpost ] = useState(null)
  
  return (
    <Window title="Briq Blog" icon={{
      id: 'blogIcon',
      alt: "Briq Blog",
      src: "https://res.cloudinary.com/nieleche/image/upload/v1689804241/blog-icon_jc9e4t.png",
    }} style={{
      width: '50em',
      height: '30em',
      top: '10vh',
     
    }} isOpenByDefault={true}>
      {
          !currentBlogpost ? (
            <>
              <p style={{ textAlign: 'center' }}>
                The latest and greatest updates from the world of Briq
              </p>
              {blogPosts &&
                blogPosts.map((post) => {
                  const { title, body, date, coverImage } = post;
                  return (
                    <div className={styles.blogpost} onClick={() => setCurrentBlogpost(post)}>
                      <img src={coverImage.url} alt={coverImage.filename} />
                      <div>
                        <h1 className={styles.heading}>{title}</h1>
                        {date && <p>{formatDate(date, true, 'd/L/y')}</p>}
                        <div dangerouslySetInnerHTML={{ __html: Contentful.parseRichText(body.json, body.links )}} className={styles.body} />
                      </div>
                    </div>
                  );
                })}
            </>
          )
          :
          <div className={styles['current-post']}>
            <button className='button' onClick={() => setCurrentBlogpost(null)}>Back</button>
            <h1 className={styles.heading}>{currentBlogpost.title}</h1>
            <div className={styles.metadata}>
              {currentBlogpost.date && <p>{formatDate(currentBlogpost.date, true, 'd/L/y')}</p>}
            </div>
            <div className={styles['image-container']}>
              <img src={currentBlogpost.coverImage.url} alt={currentBlogpost.coverImage.filename} className={styles['header-image']} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: Contentful.parseRichText(currentBlogpost.body.json, currentBlogpost.body.links )}} className={styles['full-body']} />
          </div>
      }
    </Window>
  );
}
