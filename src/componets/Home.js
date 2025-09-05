import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Items from "./Items";
import Notify from "./Notify";
import classes from "./Home.module.css";
export default function Home() {
  const inputRef = useRef(null);
  const itemsRef = useRef([]);
  const [codeState, setCodeState] = useState("");
  const [nameState, setNameState] = useState("");
  const [inDate, setInDate] = useState("");
  const [rows, setRows] = useState([]); // dữ liệu sau khi đọc

  const openPicker = () => inputRef.current?.click();
  const toShort = (s) => {
    const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!m) throw new Error("Sai định dạng dd/mm/yyyy");
    const [_, dd, mm, yyyy] = m;
    return `${dd}/${mm}/${yyyy.slice(2)}`;
  };
  function removeVietnameseTones(str) {
    return str
      .normalize("NFD") // tách ký tự + dấu
      .replace(/[\u0300-\u036f]/g, "") // xóa dấu
      .replace(/đ/g, "d") // thay đ -> d
      .replace(/Đ/g, "D"); // thay Đ -> D
  }

  function capitalizeWords(str) {
    return str
      .split(/\s+/) // tách theo khoảng trắng (kể cả nhiều dấu cách)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  // đọc file excell
  const handleFile = async (e) => {
    // console.log(err);
    // if (codeState == "") {
    //   setErr(true);
    //   setTitleNotify("Thiếu code trại");
    //   return;
    // }
    // if (nameState == "") {
    //   setErr(true);
    //   setTitleNotify("Thiếu tên trại");
    //   return;
    // }
    const file = e.target.files?.[0];
    if (!file) return;

    // kiểm tra định dạng
    const okTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      "application/vnd.ms-excel", // .xls
      "text/csv", // .csv
    ];
    if (
      !okTypes.includes(file.type) &&
      !file.name.match(/\.(xlsx|xls|csv)$/i)
    ) {
      alert("Vui lòng chọn file Excel (.xlsx, .xls) hoặc CSV.");
      e.target.value = ""; // reset input
      return;
    }

    // đọc file
    const data = await file.arrayBuffer();
    const wb = XLSX.read(data, { type: "array" });
    const firstSheet = wb.SheetNames[0];
    const ws = wb.Sheets[firstSheet];
    const json = XLSX.utils.sheet_to_json(ws, {
      defval: "",
      raw: false,
      cellDates: true,
    });
    //lọc data
    const dataJson = json.map((e) => {
      let breed;
      if (["01", "11"].includes(e.Breed)) {
        breed = "L" + e.Breed;
      } else if (["22", "21"].includes(e.Breed)) {
        breed = "L" + e.Breed;
      } else {
        breed = "CP" + e.Breed;
      }

      return {
        track4: e.Swine_ID,
        track11: e.Swine_track,
        breed: breed,
        brithDate: toShort(e.Birth_date),
        sireTrack: e.Sire_track,
        damTrack: e.Dam_track,
        activeDate: inDate,
        dateIn: e.Swine_date_in,
        codeFarm1: "005" + codeState,
        codeFarm2: "005" + codeState + "-0-0",
        nameFarm: nameState,
      };
    });
    // mảng các object
    setRows(dataJson);

    // reset để lần sau chọn lại cùng file vẫn bắt onChange
    e.target.value = "";
  };

  const exportPDF = async () => {
    const pdf = new jsPDF({
      orientation: "portrait", // hoặc "landscape"
      unit: "in", // đơn vị: "pt", "mm", "cm", "in"
      format: [8.26, 11.68],
    });

    for (let i = 0; i < itemsRef.current.length; i++) {
      const element = itemsRef.current[i];

      if (!element) continue;

      // Chỉ render từng item nhỏ gọn
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.9); // dùng jpeg nhẹ hơn png
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      console.log(1);
      // Giải phóng bộ nhớ canvas
      canvas.remove();
    }

    pdf.save("items.pdf");
    console.log("dã xong");
  };
  const handleSetName = (e) => {
    let noTone = removeVietnameseTones(e.target.value);
    let result = capitalizeWords(noTone);
    setNameState(result);
  };
  // const exportPDF = useReactToPrint({
  //   contentRef: itemsRef,
  //   documentTitle: "items",
  //   pageStyle: `
  //   @page {
  //     { size: 7.26in 11.68in; }
  //   }
  // `,
  // });
  // const cancelErrhandler = () => {
  //   setErr(false);
  // };
  return (
    <>
      {/* {err && <Notify title={titleNotify} handler={cancelErrhandler} />} */}
      <div style={{ display: "grid", gap: 8 }}>
        {/* Nút đẹp để mở hộp thoại chọn file */}
        <form className={classes.form}>
          <div className={classes["container-input"]}>
            <input
              onChange={(e) => {
                setCodeState(e.target.value.toUpperCase());
              }}
              className={classes["input"]}
              type="text"
              required
              placeholder="code trại"
            ></input>
            <p className={classes["title-input"]}>
              {codeState == "" ? "VD: E127" : "005" + codeState}
            </p>
          </div>
          <div className={classes["container-input"]}>
            <input
              onChange={(e) => handleSetName(e)}
              className={classes["input"]}
              placeholder="tên trại"
              type="text"
              required
            ></input>
            <p className={classes["title-input"]}>
              {nameState == "" ? "VD: Da Lay" : nameState}
            </p>
          </div>
          <div className={classes["container-input"]}>
            <input
              onChange={(e) => setInDate(e.target.value)}
              className={classes["input"]}
              placeholder="Ngày nhận"
              type="text"
              required
            ></input>
            <p className={classes["title-input"]}>
              {inDate == "" ? "dd/mm/yyyy" : inDate}
            </p>
          </div>
        </form>
        {codeState == "" || nameState == "" || inDate == "" || (
          <div className={classes["container-button-file"]}>
            <button
              className={classes["custom-btn"]}
              type="button"
              onClick={openPicker}
            >
              Chọn file Excel
            </button>
          </div>
        )}
        {rows.length > 0 && (
          <div className={classes["container-print"]}>
            <strong>Tổng: {rows.length} thẻ</strong>
            <button className={classes["custom-btn"]} onClick={exportPDF}>
              IN
            </button>
          </div>
        )}

        {/* Input file ẩn */}
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          style={{ display: "none" }}
          onChange={handleFile}
        />
        {/* Demo hiện dữ liệu đọc được */}
      </div>
      {rows.length != 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {rows.map((e, i) => {
            return (
              <div
                ref={(el) => (itemsRef.current[i] = el)}
                className={classes.page}
                key={i}
              >
                <Items props={e} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
