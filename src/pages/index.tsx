import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';

import Logo from '../../public/images/logo.svg'

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import Image from 'next/image'
import Header from '../components/Header';
import Link from 'next/link';
import { Head } from 'next/document';
import * as prismic from '@prismicio/client'

import { FiCalendar, FiUser } from 'react-icons/fi';


interface Post {
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

export default function Home() {
  return(
    <>
      <div className={styles.content}>
        <Header/>
        <div className={styles.posts}>
            <Link href='#'>
              <a>
              <strong className={styles.postTitle}>Como utilizar Hooks</strong>
              <p className={styles.postContent}>Pensando em sincronização em vez de ciclos de vida.</p>
              <span>
                <p><FiCalendar id={styles.calendar}/>19 Abr 2021</p>
                <p><FiUser id={styles.user}/>Danilo</p>
              </span>
              </a>
            </Link>
            <Link href='#'>
              <a>
              <strong className={styles.postTitle}>Criando um app CRA do zero</strong>
              <p className={styles.postContent}>Tudo sobre como criar a sua primeira aplicação utilizando Create React App. Tudo sobre como criar a sua primeira aplicação utilizando Create React App. Tudo sobre como criar a sua primeira aplicação utilizando Create React App</p>
              <span>
                <p><FiCalendar id={styles.calendar}/>19 Abr 2021</p>
                <p><FiUser id={styles.user}/>Danilo</p>
              </span>
              </a>
            </Link>
            <Link href='#'>
              <a>
              <strong className={styles.postTitle}>Como utilizar Hooks</strong>
              <p className={styles.postContent}>Pensando em sincronização em vez de ciclos de vida.</p>
              <span>
                <p><FiCalendar id={styles.calendar}/>19 Abr 2021</p>
                <p><FiUser id={styles.user}/>Danilo</p>
              </span>
              </a>
            </Link>
            <button id={styles.loadPost}>Carregar mais posts</button>
          </div>
        </div>
    </>
  )
}

// export const getStaticProps = async () => {
//   const prismic = getPrismicClient({})

//   const client = prismic.createClient(endpoint, { routes, accessToken })

//   const postsResponse = await prismic.getByType([prismic.Predicate]);

//   // const getByType;

//   // TODO
// };
