import { ImageResponse } from "next/og";

export const alt = "Rishideep Mandavilli — AI products you can inspect";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0a0b0e";
const LINE = "#353d4d";
const SIGNAL = "#c8f550";
const PAPER = "#f2f4ec";
const MIST = "#c6ccd4";

const CHIPS = ["on-device speech", "retrieval pipelines", "full-stack product", "design systems"];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: INK,
          backgroundImage: `linear-gradient(150deg, rgba(200,245,80,0.10) 0%, rgba(200,245,80,0) 46%)`,
          padding: "72px 80px",
          color: PAPER,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 18,
              height: 18,
              backgroundColor: SIGNAL,
              transform: "rotate(45deg)",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 4,
              color: MIST,
              textTransform: "uppercase",
            }}
          >
            rishideep-m.vercel.app
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            I build AI products
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
              color: SIGNAL,
            }}
          >
            you can inspect.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {CHIPS.map((chip) => (
              <div
                key={chip}
                style={{
                  display: "flex",
                  border: `1px solid ${LINE}`,
                  padding: "10px 18px",
                  fontSize: 22,
                  letterSpacing: 2,
                  color: MIST,
                  textTransform: "uppercase",
                }}
              >
                {chip}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              borderTop: `1px solid ${LINE}`,
              paddingTop: 28,
            }}
          >
            <div style={{ display: "flex", fontSize: 30, fontWeight: 600 }}>
              Rishideep Mandavilli
            </div>
            <div style={{ display: "flex", fontSize: 24, letterSpacing: 2, color: MIST }}>
              AI PRODUCTS · FULL-STACK · UI/UX DESIGN
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
