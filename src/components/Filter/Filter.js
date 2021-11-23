import React from "react";
import styles from "../Form/Form.module.css";

const Filter = ({ nameFilter, onChangeFilter }) => {
  return (
    <>
      <h3 className={styles.title}>Find contacts by name</h3>
      <label className={styles.label}>
        <input
          type="text"
          className={styles.input}
          name="filter"
          value={nameFilter}
          onChange={onChangeFilter}
        />
      </label>
    </>
  );
};
export default Filter;
