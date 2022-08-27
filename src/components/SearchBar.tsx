import styles from "styles/components.module.scss";

interface Props {
  state: string;
  setState: (state: string) => void;
}

const SearchBar: React.FC<Props> = ({ state, setState }) => {
  return (
    <div className={styles.searchBarComponent}>
      <input
        className={styles.searchBarInput}
        type="text"
        placeholder="Search by name or entry number"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
