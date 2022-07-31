import Image from "next/image";
import earth from "../public/earth.png";
import timezones from "../pages/api/timezones.json";
import styles from "../styles/Header.module.scss";
import { useContext, useEffect, useState } from "react";
import cn from "classnames";
import { TimezoneContext } from "../providers/Timezone";
import { ClickAwayListener } from "@mui/base";

export const Header = () => {
  const { setTimezone } = useContext(TimezoneContext);
  const [timeZone, setTimeZone] = useState(timezones[3]);
  const [activeSelect, setActiveSelect] = useState(false);

  const handleClick = () => {
    setActiveSelect(false);
  };

  useEffect(() => {}, []);

  return (
    <header className={styles.timezone}>
      <div className={styles.timezone__header}>
        <h1 className={styles.timezome__title}>Event Manager</h1>
      </div>

      <div className={styles.timezone__box}>
        <div className={styles.container}>
          <Image
            className={styles.timezone__image}
            src={earth}
            alt="earth"
            width={32}
            height={32}
          />
          <p className={styles.timezone__subtitle}>Select Timezone</p>
        </div>
        <div>
          <span className={styles.timezone__select__image}></span>
          <div
            className={cn({
              [styles.timezone__select]: activeSelect === false,
              [styles.timezone__select__unactive]: activeSelect === true,
            })}
            onClick={() => setActiveSelect(!activeSelect)}
          >
            <p>{timeZone.name}</p>
          </div>
          <ul
            className={cn({
              [styles.timezone__options]: activeSelect === true,
              [styles.timezone__options__unactive]: activeSelect === false,
            })}
          >
            {activeSelect === true &&
              timezones.map((timezone) => (
                <ClickAwayListener onClickAway={handleClick} key={timezone.id}>
                  <li
                    className={cn({
                      [styles.timezone__option]: activeSelect === true,
                      [styles.timezone__option__unactive]:
                        activeSelect === false,
                      [styles.timezone__option__select]: timeZone === timezone,
                    })}
                    onTouchEnd={() => {
                      setTimezone(timezone.value);
                      setTimeZone(timezone);
                      setActiveSelect(!activeSelect);
                    }}
                    onClick={() => {
                      setTimezone(timezone.value);
                      setTimeZone(timezone);
                      setActiveSelect(!activeSelect);
                    }}
                  >
                    {timezone.name}
                  </li>
                </ClickAwayListener>
              ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
