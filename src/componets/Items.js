import { useState, useEffect } from "react";
import classes from "./Items.module.css";
import QRCode from "qrcode";
export default function Items({ props }) {
  const [dataUrl, setDataUrl] = useState("");

  useEffect(() => {
    const qrSwine =
      props.codeFarm1 +
      "#" +
      props.codeFarm2 +
      "#" +
      props.track4 +
      "#" +
      props.track11 +
      "#" +
      props.dateIn;

    QRCode.toDataURL(
      qrSwine,
      { version: 4, width: 500, errorCorrectionLevel: "L" },

      (err, dataUrl) => {
        if (err) console.error(err);

        // set dataUrl state to dataUrl
        setDataUrl(dataUrl);
      }
    );
  });

  return (
    <div
      className={classes.font}
      style={{
        pageBreakAfter: "always", // mỗi item ngắt trang
        width: "793.33331", // đúng khổ A4
        minHeight: "1000", // chiều cao A4

        // lề trong
      }}
    >
      <title />
      <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\nbody {padding:0; margin:0; text-align:center; background-color:#777}\n.page {margin:5px 0}\n.page svg {background-color:#fff}\n",
        }}
      />
      <div className="page">
        {/* Created with Inkscape (http://www.inkscape.org/) */}
        <svg
          version="1.1"
          id="svg2"
          width="793.33331"
          height="1000"
          viewBox="0 0 793.33331 1000"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xmlns="http://www.w3.org/2000/svg"
          //   xmlns:svg="http://www.w3.org/2000/svg"
        >
          <defs id="defs6">
            <clipPath clipPathUnits="userSpaceOnUse" id="clipPath14">
              <path d="m 8.8,-11.9 h 578 V -830 H 8.8 Z" id="path12" />
            </clipPath>
            <clipPath clipPathUnits="userSpaceOnUse" id="clipPath22">
              <path d="m 68.8,-76.9 h 96 v -17.2 h -96 z" id="path20" />
            </clipPath>
          </defs>
          {/* <g id="g8" transform="matrix(1.3333333,0,0,-1.3333333,0,-1.2000053)"> */}
          <g
            style={{ scale: "1.1" }}
            id="g8"
            transform="matrix(1.2503333,0,0,-1.3133333,-18,-10.0000053)"
          >
            <g id="g10" clipPath="url(#clipPath14)">
              <g id="g16">
                <g id="g18" clipPath="url(#clipPath22)">
                  {/* track4 */}
                  <text
                    xmlSpace="preserve"
                    transform="matrix(1,0,0,-0.95,74.8,-92.35)"
                    style={{
                      fontVariant: "normal",
                      fontWeight: "bold",
                      fontSize: "17px",
                      writingMode: "lr-tb",
                      fill: "#000000",
                      fillOpacity: 1,
                      fillRule: "nonzero",
                      stroke: "none",
                    }}
                    id="text26"
                  >
                    <tspan x="0" y={0} id="tspan24">
                      {props.track4}
                    </tspan>
                  </text>
                </g>
              </g>
              {/* breed */}
              <text
                xmlSpace="preserve"
                transform="matrix(1,0,0,-0.95,86.8,-63.3)"
                style={{
                  fontVariant: "normal",
                  fontWeight: "bold",
                  fontSize: "17px",
                  writingMode: "lr-tb",
                  fill: "#000000",
                  fillOpacity: 1,
                  fillRule: "nonzero",
                  stroke: "none",
                }}
                id="text30"
              >
                <tspan x="0" y={0} id="tspan28">
                  {props.breed}
                </tspan>
              </text>
              {/* brith date */}
              <text
                xmlSpace="preserve"
                transform="matrix(1,0,0,-0.95,80.8,-110.7)"
                style={{
                  fontVariant: "normal",
                  fontWeight: "normal",
                  fontSize: "9.95px",
                  writingMode: "lr-tb",
                  fill: "#000000",
                  fillOpacity: 1,
                  fillRule: "nonzero",
                  stroke: "none",
                }}
                id="text34"
              >
                <tspan
                  x="0 4.975 9.95 14.925 17.8 22.775 27.75 30.625"
                  y={0}
                  id="tspan32"
                >
                  {props.brithDate}
                </tspan>
              </text>
              {/* track 11 */}
              <text
                xmlSpace="preserve"
                transform="matrix(1,0,0,-1,381.8,-51.3)"
                style={{
                  fontVariant: "normal",
                  fontWeight: "bold",
                  fontSize: "17px",
                  writingMode: "lr-tb",
                  fill: "#000000",
                  fillOpacity: 1,
                  fillRule: "nonzero",
                  stroke: "none",
                }}
                id="text38"
              >
                <tspan
                  x="0"
                  // x="0 7.7245 15.449 20.5925 28.317 33.4605 41.185 48.9095 56.634 64.3585 69.502 77.2265 84.951 92.6755"
                  y={0}
                  id="tspan36"
                >
                  {props.track11}
                </tspan>
              </text>
              {/* track - dam and sire */}
              <text
                xmlSpace="preserve"
                transform="matrix(1,0,0,-1,344.8,-91.8)"
                style={{
                  fontVariant: "normal",
                  fontWeight: "normal",
                  fontSize: "9.35px",
                  writingMode: "lr-tb",
                  fill: "#000000",
                  fillOpacity: 1,
                  fillRule: "nonzero",
                  stroke: "none",
                }}
                id="text48"
              >
                <tspan
                  // x="1 5.524 10.048 13.061 17.585 20.598 25.122 29.646 34.17 38.694 41.707 46.231 50.755 55.279 -136.55 -132.026 -127.502 -124.489 -119.965 -116.952 -112.428 -107.904 -103.38 -98.856 -95.843 -91.319 -86.795 -82.271"
                  x="-125"
                  y={0}
                  id="tspan40"
                >
                  {/* {props.damTrack} */}
                  {props.sireTrack}
                </tspan>
                <tspan
                  // x="1 5.524 10.048 13.061 17.585 20.598 25.122 29.646 34.17 38.694 41.707 46.231 50.755 55.279 -136.55 -132.026 -127.502 -124.489 -119.965 -116.952 -112.428 -107.904 -103.38 -98.856 -95.843 -91.319 -86.795 -82.271"
                  x="25"
                  y={0}
                  id="tspan40"
                >
                  {props.damTrack}
                  {/* {props.sireTrack} */}
                </tspan>
                <tspan
                  // x="-106 -101.475 -96.949997 -94.434097 -89.909103 -85.384102 -82.868202 -78.343201 -73.818199 -69.293198"
                  x="-94.45"
                  y={18}
                  id="tspan42"
                >
                  {props.activeDate}
                </tspan>
                <tspan
                  // x="12 16.525 21.049999 23.565901 28.0909 32.615898 35.131802 39.656799 44.181801 48.706799 53.2318 55.494301 60.019299 64.544296 69.069298 73.594299 78.119301"
                  x="37"
                  y={-30}
                  id="tspan44"
                >
                  {props.dateIn}
                </tspan>

                <tspan x={15} y={-18}>
                  {props.codeFarm2}
                </tspan>
                <tspan dx="13.12">{props.nameFarm}</tspan>
              </text>
              {/* qr code  */}
              <g id="g50" transform="matrix(60,0,0,48,507.8,-70.9)">
                <image
                  width={1}
                  height={1}
                  style={{ imageRendering: "optimizeSpeed", scale: "0.90" }}
                  preserveAspectRatio="none"
                  transform="matrix(1.1,0,0,-1.021,-0.1,1.05)"
                  xlinkHref={dataUrl}
                  // xlinkHref="data:image/png;base64,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"
                  id="image52"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
