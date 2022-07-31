import dayjs, { Dayjs } from "dayjs";
import React, { useContext, useState } from "react";
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);
import { TimezoneContext } from "../providers/Timezone";
import styles from "../styles/Post.module.scss";
import { ClickAwayListener } from "@mui/base";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CloseIcon from "@mui/icons-material/Close";

const Post = ({ events, setEvents, switcher }) => {
  const { timezone } = useContext(TimezoneContext);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  const formPublish = (id) => {
    setEvents(
      events.map((event) => {
        if (event.id === id) {
          return {
            id: event.id,
            title: event.title,
            isPublished: !event.isPublished,
            time: event.time,
          };
        }

        return event;
      })
    );
    setShowEditForm(false);
  };

  const handleEdit = (event) => {
    setEditTitle(event.title);
    setShowEdit(event.id);
    setShowEditForm(false);
  };

  const formEdit = (event, id) => {
    event.preventDefault();

    setEvents(
      events.map((Event) => {
        if (Event.id === id) {
          return {
            id: Event.id,
            title: editTitle,
            isPublished: Event.isPublished,
            time: Event.time,
          };
        }

        return Event;
      })
    );
    setShowEdit(false);
    setEditTitle("");
  };

  const formDelete = (id) => {
    setEvents(events.filter((event) => event.id !== id));
    setShowEditForm(false);
  };

  return (
    <>
      {events
        .filter((Event) => Event.isPublished === switcher)
        .map((Event) => (
          <React.Fragment key={Event.id}>
            <div className={styles.post}>
              <p className={styles.post__title}>{Event.title}</p>
              <div className={styles.post__navigation__box}>
                <button
                  className={styles.post__navigation__menu}
                  onClick={() => setShowEditForm(Event.id)}
                >
                  ...
                </button>
                <p className={styles.post__navigation__time}>
                  {dayjs(Event.time)
                    .tz(timezone)
                    .format(" h: mm a - d MMMM YYYY")}
                </p>
              </div>
              {showEdit === Event.id && (
                <ClickAwayListener onClickAway={() => setShowEdit(null)}>
                  <form
                    onSubmit={(event) => formEdit(event, Event.id)}
                    className={styles.post__edit}
                  >
                    <div className={styles.post__edit__box}>
                      <p>Change the title</p>{" "}
                      <button className="button is-white p-0" type="button" onClick={() => setShowEdit(false)}>
                        <CloseIcon />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(event) => setEditTitle(event.target.value)}
                      className="input is-primary"
                      required
                    />
                    <button className="button is-info" type="submit">
                      Сonfirm
                    </button>
                  </form>
                </ClickAwayListener>
              )}

              {showEditForm === Event.id && (
                <ClickAwayListener onClickAway={() => setShowEditForm(null)}>
                  <form className={styles.post__form}>
                    <Button
                      type="button"
                      variant="outlined"
                      startIcon={<CreateOutlinedIcon />}
                      onClick={() => handleEdit(Event)}
                    >
                      Edit
                    </Button>
                    {Event.isPublished === true && (
                      <Button
                        variant="outlined"
                        type="button"
                        onClick={() => formPublish(Event.id)}
                        startIcon={<CloudDownloadOutlinedIcon />}
                      >
                        Unpublish
                      </Button>
                    )}
                    {Event.isPublished === false && (
                      <Button
                        type="button"
                        variant="outlined"
                        onClick={() => formPublish(Event.id)}
                        startIcon={<CloudUploadOutlinedIcon />}
                      >
                        Publish
                      </Button>
                    )}
                    <Button
                      color="error"
                      variant="contained"
                      type="button"
                      onClick={() => formDelete(Event.id)}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </form>
                </ClickAwayListener>
              )}
            </div>
          </React.Fragment>
        ))}
    </>
  );
};

export default Post;
