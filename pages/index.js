import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { google } from 'googleapis';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ sheetData }) {
  console.log("sheetdata:", sheetData)
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
              {sheetData[0]}
              {
                dataRows.map((row) => {
                  return (
                    <div>
                      {row[0]}: {row[1]} : {row[2]}
                    </div>
                  )
                })
              }
              {/* <div>
                  {sheetData}
                </div> */}
            </div>
          )
          }
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const range = 'Sheet1!A:C';

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  })
  console.log('response:', response.data);;

  const sheetData = response.data.values;
  console.log('sheetData:', sheetData);

  return {
    props: {
      sheetData,
    },
  };
}
