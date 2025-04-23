import { useParams, useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface DownloadInfo {
  sheetId: string;
  sheetName: string;
  downloadLink: string;
  size: string;
}

export default function DownloadPage() {
  const { tmdbId } = useParams<{ tmdbId: string }>();
  const isTvPage = !!useMatch("/tv/:tmdbId/download");

  const [downloads, setDownloads] = useState<DownloadInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const apiKey = "AIzaSyBP4xjX_KFM-sY8m_9pgq0TAugxKwcZA";
  const sheetIds = [
    "1QfG84of1a2OcUoIhFfPugXudyhwiRH3F-g2MLhaPjos",
    "1ouLbT5GRUOGgVpx_sS9qYivGytf4yBdubWURjq-LhLs",
    // ... thêm nếu cần
  ];

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const allResults: DownloadInfo[] = [];

      for (const sheetId of sheetIds) {
        try {
          // Lấy metadata của spreadsheet để lấy danh sách sheet
          const metaRes = await axios.get(
            `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?key=${apiKey}`
          );
          const sheets: string[] = metaRes.data.sheets.map(
            (s: any) => s.properties.title
          );

          // Lọc sheet dựa trên loại trang: TV chỉ lấy sheet chứa "phim bộ", movie thì bỏ những sheet chứa các từ khóa
          const ignoreKeywords = ["bbcode", "trending", "news", "phim bộ"];
          const filteredSheets = sheets.filter((name) => {
            const lower = name.toLowerCase();
            if (isTvPage) {
              return lower.includes("phim bộ");
            } else {
              return !ignoreKeywords.some((k) => lower.includes(k));
            }
          });

          // Duyệt từng sheet đã lọc
          for (const sheetName of filteredSheets) {
            const dataUrl =
              `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
                sheetName
              )}?key=${apiKey}`;
            const res = await axios.get(dataUrl);
            const rows: string[][] = res.data.values;
            if (!rows || rows.length < 2) continue;

            const headers = rows[0];
            const data = rows.slice(1).map((row) =>
              (headers as string[]).reduce(
                (obj: Record<string, any>, key: string, i: number) => ({
                  ...obj,
                  [key]: row[i],
                }),
                {}
              )
            );

            // Lọc theo TMDb ID
            const matches = data.filter(
              (item: Record<string, any>) => item["TMDb id"] === tmdbId
            );

            // Map thành DownloadInfo
            const mapped = matches.map((item: Record<string, any>) => ({
              sheetId,
              sheetName,
              downloadLink: item["Download Link"],
              size: item["Size"],
            }));

            allResults.push(...mapped);
          }
        } catch (err) {
          console.error(`Lỗi khi xử lý sheet ${sheetId}:`, err);
        }
      }

      setDownloads(allResults);
      setLoading(false);
    };

    fetchAll();
  }, [tmdbId, isTvPage]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>
        Download Links for {isTvPage ? "TV Series" : "Movie"} (TMDb ID: {tmdbId})
      </h1>

      {loading ? (
        <p>Đang tải dữ liệu từ Google Sheets...</p>
      ) : downloads.length === 0 ? (
        <p style={{ color: "#888" }}>
          Không tìm thấy link tải nào cho TMDb ID: {tmdbId}
        </p>
      ) : (
        downloads.map((item, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "1rem",
              marginBottom: "1rem",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <p>
              <strong>Sheet:</strong> {item.sheetName} (ID: {item.sheetId})
            </p>
            <p>
              <strong>🔗 Link tải:</strong>{" "}
              <a
                href={item.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#0077cc",
                  textDecoration: "underline",
                  wordBreak: "break-all",
                }}
              >
                {item.downloadLink}
              </a>
            </p>
            <p>
              <strong>✅ Size:</strong> {item.size}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
