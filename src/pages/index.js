import React , { useState, useEffect } from 'react'

import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    async function getPokemon() {  
      const res = await fetch ("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json");
      const data = await res.json();
      setPokemon(data);
    }
    getPokemon();
  }, []);

  return (
    <>
      <Head>
        <title>Pokemon App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className={styles.grid}>
          {pokemon.map((pokemon) => (
            <div className={styles.card}key={pokemon.id}>
              <Link href={`/pokemon/${pokemon.id}`}>
              
                <img src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`} alt={pokemon.name} />
              
              <h3>{pokemon.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
