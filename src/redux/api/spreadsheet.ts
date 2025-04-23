import axios from 'axios';

// Tạo một instance của axios cho Google Sheets API
const googleSheetsAxios = axios.create({
  baseURL: 'https://sheets.googleapis.com/v4/spreadsheets/',
  params: {
    key: process.env.REACT_APP_GOOGLE_API_KEY, // Lấy API key từ biến môi trường
  },
});

// Hàm lấy metadata của Google Sheets
export const getGoogleSheetMetadata = async (sheetId: string) => {
  const response = await googleSheetsAxios.get(`${sheetId}`);
  return response.data;
};

// Hàm lấy dữ liệu từ một sheet cụ thể
export const getGoogleSheetData = async (sheetId: string, sheetName: string) => {
  const response = await googleSheetsAxios.get(`${sheetId}/values/${encodeURIComponent(sheetName)}`);
  return response.data;
};