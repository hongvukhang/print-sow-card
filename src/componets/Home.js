import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import classes from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
export default function Home() {
  const inputRef = useRef(null);
  const [codeState, setCodeState] = useState("");
  const [nameState, setNameState] = useState("");
  const [inDate, setInDate] = useState("");
  const [rows, setRows] = useState([]); // dữ liệu sau khi đọc
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const openPicker = () => inputRef.current?.click();
  const toShort = (s) => {
    console.log(s.length);
    const part1 = s.substring(0, 7);
    const part3 = s.substring(9, 11);
    return part1 + part3;
  };
  //hàm chuyển đổi thành không dấu
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
    const file = e.target.files?.[0];
    if (!file) return;
    const toastId = toast.loading("Đang tải dữ liệu...");
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
      toast.update(toastId, {
        render: "Vui lòng chọn file Excel (.xlsx, .xls) hoặc CSV.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
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
        breed = "Y" + e.Breed;
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
    dispatch({ type: "SET_ARRAY", payload: dataJson });
    toast.update(toastId, {
      render: "Tải dữ liệu thành công!",
      type: "success",
      isLoading: false,
      autoClose: 1000,
    });
    setTimeout(() => navigate("/print"), 1100);

    e.target.value = "";
  };
  const handleSetName = (e) => {
    let noTone = removeVietnameseTones(e.target.value);
    let result = capitalizeWords(noTone);
    setNameState(result);
  };

  return (
    <>
      <ToastContainer position="top-left" />
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
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          style={{ display: "none" }}
          onChange={handleFile}
        />
        {/* Demo hiện dữ liệu đọc được */}
      </div>
    </>
  );
}
