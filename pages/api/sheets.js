// import { google } from 'googleapis';
// import BigNumber from "bignumber.js";

// export async function getData() {
//   try {
//     const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
//     const jwt = new google.auth.JWT(
//       process.env.NEXT_PUBLIC_EMAIL,
//       null,
//       (process.env.NEXT_PUBLIC_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
//       target
//     );

//     const sheets = google.sheets({ version: 'v4', auth: jwt });
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: process.env.NEXT_PUBLIC_SHEET_ID,
//       range: 'menu', // sheet name
//     });

//     const rows = response.data.values;
//     let priceUsd_number = new BigNumber(0)

//     if (rows.length) {
//       return rows.map((row) => ({
//         id: row[0],
//         name: row[1],
//         description: row[2],
//         unitName: row[3],
//         priceSol: row[4],
//         priceUsd: +row[5] ,
//         url: row[6],
//       }));
//     }
//   } catch (err) {
//     console.log(err);
//   }
//   return [];
// }