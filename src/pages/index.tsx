import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client';

import {format, compareAsc} from 'date-fns'

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import Header from '../components/Header';
import Link from 'next/link';

import { FiCalendar, FiUser } from 'react-icons/fi';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';

type Post = {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({postsPagination}: HomeProps) {
  const formattedPost = postsPagination.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: format(new Date(post.first_publication_date), 'dd MMM yyyy', {locale: ptBR}),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  })

  const [posts, setPosts] = useState<Post[]>(formattedPost)
  const [nextPage, setNextPage] = useState(postsPagination.next_page)
  const [currentPage, setCurrentPage] = useState(1)
  
  async function handlePage(){
    
    if(currentPage !== 1 && nextPage === null){
      return;
    }

    const postResult = await fetch(`${nextPage}`).then(res=> res.json())
    console.log(postResult)
    setNextPage(postResult.next_page)
    setCurrentPage(postResult.page)

    const newPost = postResult.results.map(newPost => {
      return {
        uid: newPost.uid,
        first_publication_date: format(new Date(newPost.first_publication_date), 'dd MMM yyyy', {locale: ptBR}),
        data: {
          title: newPost.data.title,
          subtitle: newPost.data.subtitle,
          author: newPost.data.author,
        },
      };
    })

    setPosts([...posts, ...newPost])
  }

  return (
    <>
      <Header />
      <div className={styles.content}>
          <div className={styles.posts}>
            {posts.map(post => {return(
              <Link href={`/post/${post.uid}`} key={post.uid}>
              <a>
                <strong className={styles.postTitle}>
                  {post.data.title}
                </strong>
                <p>
                  {post.data.subtitle}
                </p>
                <span>
                  <p>
                    <FiCalendar id={styles.calendar} />
                    {post.first_publication_date}
                  </p>
                  <p>
                    <FiUser id={styles.user} />
                    {post.data.author}
                  </p>
                </span>
              </a>
            </Link>
            )})}
            {nextPage && (
              <button type='button' id={styles.loadPost} onClick={handlePage}>Carregar mais posts</button>
            )}
            
          </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    Prismic.predicates.at('document.type', 'posts'),
    {
      pageSize: 1,
    }
  );

  const posts = response.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      }
    }
  });

  const postsPagination = {
    next_page: response.next_page,
    results: posts
  }

  return { props: {postsPagination} };
};
