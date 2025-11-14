import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Items from "./Items";
import axios from "axios";
import classes from "./Home.module.css";
import style from "./PrintRoute.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function PrintRote() {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const data = useSelector((state) => state.data);
  const printRef = useRef();
  const navigate = useNavigate();
  const handlePrint = async () => {
    const toastId = toast.loading("Đang xuất PDF...");
    try {
      const html = printRef.current.innerHTML;
      const res = await axios.post(
        `https://print-sow-card.fly.dev/print-card`,
        { html },
        { responseType: "blob" }
      );
      console.log(res);
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      // Tạo link download
      const link = document.createElement("a");
      link.href = url;
      link.download = "output.pdf"; // tên file gợi ý
      document.body.appendChild(link);
      link.click();
      link.remove();
      // Giải phóng bộ nhớ
      window.URL.revokeObjectURL(url);
      toast.update(toastId, {
        render: "File PDF đã tải xong!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.error("❌ Lỗi:", error);
      toast.update(toastId, {
        render: "Xuất PDF thất bại!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };
  return (
    <>
      <div className={style["content-title"]}>
        <p className={style.title}>Preview Sow card</p>
        <p className={style["total-card"]}>Tổng số thẻ: {data.length}</p>
        <div className={style["container-btn"]}>
          <button
            className={classes["custom-btn"]}
            onClick={() => navigate("/")}
          >
            Quay lại
          </button>
          <button className={classes["custom-btn"]} onClick={handlePrint}>
            Print
          </button>
        </div>
      </div>
      <ToastContainer position="top-left" />
      <div ref={printRef}>
        {data.map((e, i) => (
          <Items key={i} props={e} />
        ))}
      </div>
    </>
  );
}
