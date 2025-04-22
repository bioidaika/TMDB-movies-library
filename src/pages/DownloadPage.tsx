import { useParams } from "react-router-dom";
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
  const [downloads, setDownloads] = useState<DownloadInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const apiKey = "AIzaSyBP4xj1jX_KFM-sY8m_9pgq0TAugxKwcZA";

  // 👉 Danh sách nhiều Google Sheet
  const sheetIds = [
    "1QfG84of1a2OcUoIhFfPugXudyhwiRH3F-g2MLhaPjos",
    "1ouLbT5GRUOGgVpx_sS9qYivGytf4yBdubWURjq-LhLs",
    // thêm bao nhiêu tùy ý
  ];

  const ignoreKeywords = ["home", "trending", "news", "bbcode"];

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const allResults: DownloadInfo[] = [];

      for (const sheetId of sheetIds) {
        try {
          const metaUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?key=${apiKey}`;
          const metaRes = await axios.get(metaUrl);
          const sheets = metaRes.data.sheets.map((s: any) => s.properties.title);

          const filteredSheets = sheets.filter(
            (name: string) =>
              !ignoreKeywords.some(keyword => name.toLowerCase().includes(keyword))
          );

          for (const sheetName of filteredSheets) {
            const dataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheetName)}?key=${apiKey}`;
            const res = await axios.get(dataUrl);
            const rows = res.data.values;
            if (!rows || rows.length === 0) continue;

            const headers = rows[0];
            const data = rows.slice(1).map((row: string[]) =>
              (headers as string[]).reduce((obj: Record<string, any>, key: string, i: number) => {
				return { ...obj, [key]: row[i] };
			}, {})

            );

            const matches = data.filter((item: Record<string, any>) => item["TMDb id"] === tmdbId);
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
  }, [tmdbId]);

return (
  <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
    <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Tải về phim</h2>

    {loading ? (
      <p>Đang tải dữ liệu từ Google Sheets...</p>
    ) : downloads.length === 0 ? (
      <p style={{ color: "#888" }}>Không tìm thấy link tải nào cho TMDb ID: {tmdbId}</p>
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
            <strong>📄 Sheet:</strong> <em>{item.sheetName}</em>
          </p>
          <p>
            <strong>📦 Dung lượng:</strong> {item.size || "Không rõ"}
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
        </div>
      ))
    )}
  </div>
);

}
