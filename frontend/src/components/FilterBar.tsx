import "../styles/filterbar.css";

interface FilterBarProps {
  filters: { minPrice?: number; maxPrice?: number; rooms?: string };
  onFilterChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onFilterSubmit: () => void;
}

const FilterBar = ({
  filters,
  onFilterChange,
  onFilterSubmit,
}: FilterBarProps) => {
  return (
    <div className="filter-bar">
      <input
        type="number"
        name="minPrice"
        placeholder="Мин. цена"
        value={filters.minPrice || ""}
        onChange={onFilterChange}
      />
      <input
        type="number"
        name="maxPrice"
        placeholder="Макс. цена"
        value={filters.maxPrice || ""}
        onChange={onFilterChange}
      />
      <select
        name="rooms"
        value={filters.rooms || ""}
        onChange={onFilterChange}
      >
        <option value="">Все комнаты</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <button onClick={onFilterSubmit}>Применить фильтр</button>{" "}
    </div>
  );
};

export default FilterBar;
