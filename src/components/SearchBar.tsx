import styles from "styles/components.module.scss";

import searchImage from "/search.svg";

interface Props {
  state: string;
  setState: (state: string) => void;
}

const SearchBar: React.FC<Props> = ({ state, setState }) => {
  return (
    <div className={styles.searchBarComponent}>
      <img
        className={styles.searchBarIllustration}
        src={searchImage}
        alt="Search"
      />
      <input
        className={styles.searchBarInput}
        type="text"
        placeholder="Search by name or entry number"
        value={state}
        autoCorrect="off"
        spellCheck={false}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
