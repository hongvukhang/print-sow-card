import classes from "./Notify.module.css";
export default function Notify({ title, handler }) {
  return (
    <div className={classes["container-notify"]}>
      <div className={classes["content-notify"]}>
        <p className={classes["title-notify"]}>{title}</p>
        <button onClick={handler} className={classes["notify-btn"]}>
          Ok!
        </button>
      </div>
    </div>
  );
}
