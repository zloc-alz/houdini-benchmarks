import { google } from 'googleapis';

export async function getServerSideProps({ query }) {


    // Auth
    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

    const sheets = google.sheets({ version: 'v4', auth });
    // console.log(sheets)

    // Query
    const { id } = query;
    const range = `Sheet1!A${id}:C${id}`;

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range,
    });

    console.log("logging response:")
    console.log(response.data)

    // Result
    const [title, content] = response.data.values[0];
    // console.log(title, content)

    return {
        props: {
            title,
            content
        }
    }
}

export default function Post({ title, content }) {
    return (
        <div>
            <h1>{title}</h1>
            <div>{content}</div>
        </div>
    )
}