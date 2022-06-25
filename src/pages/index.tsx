import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import Header from '../components/Header';
import Link from 'next/link';

import { FiCalendar, FiUser } from 'react-icons/fi';

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

interface PostProps {
  posts: Post[]
}

export default function Home({posts}: PostProps) {
  return (
    <>
      <div className={styles.content}>
        <Header />
          <div className={styles.posts}>
            {posts.map(post => {return(
              <Link href="#" key={post.uid}>
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
            <button id={styles.loadPost}>Carregar mais posts</button>
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
      pageSize: 3,
    }
  );

  const posts = response.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: new Date(post.first_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  return { props: {posts} };
};
