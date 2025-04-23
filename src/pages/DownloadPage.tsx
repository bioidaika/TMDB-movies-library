import { useParams, useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGoogleSheetMetadata, getGoogleSheetData } from "../redux/api/spreadsheet";

interface DownloadInfo {
  sheetId: string;
  sheetName: string;
  downloadLink: string;
  size: string;
}

// Helper: remove accents and lowercase
function normalizeText(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

// Cache structure
const cache: {
  data: DownloadInfo[] | null;
  timestamp: number | null;
} = {
  data: null,
  timestamp: null,
};

const CACHE_TTL = 22 * 60 * 1000; // 22 phút (ms)

export default function DownloadPage() {
  const { tmdbId } = useParams<{ tmdbId: string }>();
  const isTvPage = !!useMatch("/tv/:tmdbId/download");

  const [downloads, setDownloads] = useState<DownloadInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const sheetIds = [
    "1QfG84of1a2OcUoIhFfPugXudyhwiRH3F-g2MLhaPjos",
    "1ouLbT5GRUOGgVpx_sS9qYivGytf4yBdubWURjq-LhLs",
    // thêm sheet ID nếu cần
  ];

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);

      // Kiểm tra cache
      const now = Date.now();
      if (cache.data && cache.timestamp && now - cache.timestamp < CACHE_TTL) {
        console.debug("Sử dụng dữ liệu từ cache");
        setDownloads(cache.data);
        setLoading(false);
        return;
      }

      console.debug("Cache hết hạn hoặc chưa có, gọi API...");
      const allResults: DownloadInfo[] = [];

      for (const sheetId of sheetIds) {
        try {
          const metaRes = await getGoogleSheetMetadata(sheetId);
          const sheets: string[] = metaRes.sheets.map((s: any) => s.properties.title);

          // Lọc sheet: accent-insensitive
          const filteredSheets = sheets.filter((name) => {
            const normName = normalizeText(name);
            if (isTvPage) {
              // TV page: chỉ lấy sheet có 'phim bo'
              return normName.includes("phim bo");
            } else {
              // Movie page: loại bỏ sheet chứa các keyword
              const exclude = ["phim bo", "bbcode", "trending", "news"];
              return !exclude.some((kw) => normName.includes(kw));
            }
          });

          console.debug({ sheetId, sheets, filteredSheets });

          for (const sheetName of filteredSheets) {
            const dataRes = await getGoogleSheetData(sheetId, sheetName);
            const rows: string[][] = dataRes.values;
            if (!rows || rows.length < 2) continue;

            // Normalize headers
            const headers = rows[0].map((h) => normalizeText(h.trim()));
            const data = rows.slice(1).map((row) => {
              const obj: Record<string, string> = {};
              row.forEach((cell, idx) => {
                obj[headers[idx]] = cell;
              });
              return obj;
            });

            // Filter by TMDb ID (trimmed)
            const matches = data.filter((item) =>
              item["tmdb id"]?.trim() === tmdbId
            );

            console.debug({ sheetName, totalRows: data.length, matchesCount: matches.length });

            const mapped = matches.map((item) => ({
              sheetId,
              sheetName,
              downloadLink: item["download link"].trim(),
              size: item["size"].trim(),
            }));
            allResults.push(...mapped);
          }
        } catch (err) {
          console.error(`Error processing sheet ${sheetId}:`, err);
        }
      }

      // Lưu dữ liệu vào cache
      cache.data = allResults;
      cache.timestamp = Date.now();

      setDownloads(allResults);
      setLoading(false);
    }

    fetchAll();
  }, [tmdbId, isTvPage]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>
        {isTvPage ? "TV Series" : "Movie"} Download Links (TMDb ID: {tmdbId})
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
