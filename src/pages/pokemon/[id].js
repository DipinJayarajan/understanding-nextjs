import React from 'react'
import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Details.module.css'
import Link from 'next/link'


export async function getStaticPaths() {
    const resp = await fetch(
      "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
    );
    const pokemon = await resp.json();
  
    return {
      paths: pokemon.map((pokemon) => ({
        params: { id: pokemon.id.toString() },
      })),
      fallback: false,
    };
  }


export async function getStaticProps({params}){
    const res = await fetch (`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`);

    return{
        props: {
            pokemon: await res.json()
        },

        revalidate: 30,
    }
   
}


export default function Details( {pokemon} ) {


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


