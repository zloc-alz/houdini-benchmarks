import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { google } from 'googleapis';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ sheetData }) {
  // console.log("sheetdata:", sheetData)
  const headerRow = sheetData[0];
  const dataRows = sheetData.slice(1);

  return (
    <>
      <Head>
        <title>Houdini Benchmarks</title>
        <meta name="description" content="Benchmark statistics for Houdini by SideFX" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.h1}>
          Houdini Benchmarks
        </h1>
        <div>
          {sheetData && (
            <div className="sheetData">
              <p>
                Header Row
              </p>
              {sheetData[0][2]}
              <p>
                Data Rows
              </p>
              {
                dataRows.map((row) => {
                  return (
                    <div>
                      {row[2]} &#x9;&#x9;&#x9; {row[3]} {row[4]} {row[5]} {row[6]} {row[7]} {row[8]}
                    </div>
                  )
                })
              }
            </div>
          )
          }
        </div>
      </main>
    </>
  )
}

// export async function getStaticProps() {
//   const auth = await google.auth.getClient({
//     scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
//   });
//   // console.log(auth)
//   const sheets = google.sheets({ version: 'v4', auth });
//   const range = 'A:Z';
//   const response = await sheets.spreadsheets.values.get({
//     spreadsheetId: process.env.SHEET_ID,
//     range,
//   })
//   const sheetData = response.data.values;

//   return {
//     props: {
//       sheetData,
//     },
//     revalidate: 10,
//   };
// }

export async function getServerSideProps() {
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const range = 'A:Z';
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });
  const sheetData = response.data.values;

  return {
    props: {
      sheetData,
    },
  };
}