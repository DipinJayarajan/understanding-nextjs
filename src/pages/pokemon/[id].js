import { useRouter } from 'next/router'
import React , { useState, useEffect } from 'react'

import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Details.module.css'
import Link from 'next/link'


export default function Details() {

    const {
        query: { id },
  
    } = useRouter();

    const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function getPokemon() {  
      const res = await fetch (`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`);
      const data = await res.json();
      setPokemon(data);
    }
    if (id) {
        getPokemon();
    }

  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
}

    return (
        <div>
                <div>
                    <Head>
                        <title>{pokemon.name}</title>
                    </Head>
                </div>
                <div>
                <Link href="/" >
                Back to Home
                </Link>
                </div>
                <div className={styles.layout}> 
                <img 
                className={styles.picture}
                src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                alt={pokemon.name.english}
                priority="true"
                />
                </div>
                <div>
                    <div className={styles.name}>{pokemon.name}</div>
                    <div className={styles.type}>{pokemon.type.join(", ")} </div>
                    <table>
                        <thead className={styles.header}>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemon.stats.map(({ name, value }) => {
                               return <tr key={name}>
                                    <td className={styles.attribute} >{name}</td>
                                    <td>{value}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
        </div>
    )
}

