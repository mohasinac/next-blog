import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import moment from 'moment'
import { getRecentPosts, getSimilarPosts } from '../services'

const PostWidget = ({ categories, slug = '' }) => {
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((res) => {
        setRelatedPosts(res)
      })
    } else {
      getRecentPosts().then((res) => {
        setRelatedPosts(res)
      })
    }
  }, [slug])
  
  return (
    <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.map((post) => (
        <div key={post.title} className="wi-full mb-4 flex items-center">
          <div className='w-16 flex-none'>
            <img alt={post.title}
            height="60px"
            width="60px"
            className="align-middle rounded-full"
            src={post.featuredImage.url}
            />
          </div>
          <div className='flex-grow ml-4'>
            <p className='text-gray-500 font-xs'>
            { moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link key={post.slug} href={`post/${post.slug}`} className='text-md'>
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget
