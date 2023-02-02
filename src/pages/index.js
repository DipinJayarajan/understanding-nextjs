import React , { useState, useEffect } from 'react'

import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps(){
  const res = await fetch ("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json");

  return {
    props: {
      pokemon: await res.json()
    }
  }
}

export default function Home( {pokemon} ) {

  return (
    <>
      <Head>
        <title>Pokemon App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className={styles.grid}>
          {pokemon?.map((pokemons) => (
            <div className={styles.card}key={pokemons.id}>
              <Link href={`/pokemon/${pokemons.id}`}>
              
                <img src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemons.image}`} alt={pokemons.name} />
              
              <h3>{pokemons.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
