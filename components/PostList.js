import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
import styles from "../styles/PostList.module.scss";
import cn from "classnames";
import { useEffect, useState } from "react";
import Post from "./Post";
import { ClickAwayListener } from "@mui/base";
import CloseIcon from "@mui/icons-material/Close";

const PostList = () => {
  const [switcher, setSwitcher] = useState(true);
  const currentTime = dayjs.utc().format(" h: mm a - d MMMM YYYY");
  const [eventTitle, setEventTitle] = useState("");
  const [form, setForm] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 0,
      title:
        "Lorem ipsum qwrqwrqwrqwrwqrqwrtfweqgtegwegwegw wegtwgweg wwegfwegweg gweg we gweg weg  wefgwegwegwegweg we fwe fwef wef wef wef wef wef wef wef wef wef wq sit ameqwrfqwqwfqwfqwft",
      time: "2022-06-27T07:07:08.350Z",
      isPublished: false,
    },
    {
      id: 1,
      title: "Lorem ipsum wfwqegwegwegwegwegwegweggwegwegweg amet",
      time: "2022-04-28T07:07:08.350Z",
      isPublished: true,
    },
    {
      id: 2,
      title: "Lorem ip amet",
      time: "2022-02-26T07:07:08.350Z",
      isPublished: false,
    },
    {
      id: 3,
      title: "Lorem ip amet",
      time: "2022-02-26T07:07:08.350Z",
      isPublished: false,
    },
    {
      id: 4,
      title: "Lorem ip amet",
      time: "2022-02-26T07:07:08.350Z",
      isPublished: false,
    },
  ]);

  const handleClick = () => {
    setForm(false);
  };

  const addEvent = (event) => {
    event.preventDefault();

    let eventObject = {
      id: uuidv4(),
      title: eventTitle,
      time: dayjs.utc(),
      isPublished: false,
    };

    setEvents([...events, eventObject]);
    setForm(false);
    setEventTitle("");
  };

  useEffect(() => {
    console.log(events);
  }, [switcher, currentTime, events, setEvents]);

  return (
    <article className={styles.postlist}>
      <div className={styles.postlist__box}>
        <ul className={styles.postlist__switch}>
          <span
            className={cn({
              [styles.postlist__switch__publish]: switcher === true,
              [styles.postlist__switch__unpublish]: switcher === false,
            })}
          ></span>
          <li
            className={cn({
              [styles.postlist__switch__item]: switcher === false,
              [styles.postlist__switch__item__color]: switcher === true,
            })}
            onClick={() => setSwitcher(true)}
          >
            Published
          </li>
          <li
            className={cn({
              [styles.postlist__switch__item]: switcher === true,
              [styles.postlist__switch__item__color]: switcher === false,
            })}
            onClick={() => setSwitcher(false)}
          >
            Unpublished
          </li>
        </ul>
        <button
          type="button"
          className={styles.postlist__add__event}
          onClick={() => setForm(true)}
        >
          Add Event
        </button>
        {form === true && (
          <ClickAwayListener onClickAway={handleClick}>
            <form
              className={styles.postlist__add__event__form}
              onSubmit={(event) => addEvent(event)}
            >
              <div className={styles.postlist__add__event__form__box}>
                <h2 className="title is-4">Event Form</h2>
                <button className="p-2 button is-danger is-outlined" onClick={()=> setForm(false)}>
                  <CloseIcon />
                </button>
              </div>

              <p>Write a title</p>
              <input
                className="input is-primary"
                type="text"
                value={eventTitle}
                onChange={(event) => setEventTitle(event.target.value)}
                required
              ></input>
              <button className="button is-success" type="submit">
                Send Event
              </button>
              <p>Current time (UTC):</p>
              <p>{dayjs.utc().format(" h: mm a - d MMMM YYYY")}</p>
            </form>
          </ClickAwayListener>
        )}
      </div>
      <div className={styles.postlist__list}>
        <Post events={events} setEvents={setEvents} switcher={switcher} />
      </div>
    </article>
  );
};

export default PostList;
