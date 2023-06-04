import { MouseEventHandler, useCallback, useState } from "react";
import data from "../data/Finals.json";

type Data = typeof data;

type SortKeys = keyof Data[0];

type SortOrder = "ascn" | "desc";

function sortData({
  tableData,
  sortKey,
  reverse,
}: {
  tableData: Data;
  sortKey: SortKeys;
  reverse: boolean;
}) {
  if (!sortKey) return tableData;

  const sortedData = data.sort((a, b) => {
    return a[sortKey] > b[sortKey] ? 1 : -1;
  });

  if (reverse) {
    return sortedData.reverse();
  }

  return sortedData;
}

function SortButton({
  sortOrder,
  columnKey,
  sortKey,
  onClick,
}: {
  sortOrder: SortOrder;
  columnKey: SortKeys;
  sortKey: SortKeys;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        sortKey === columnKey && sortOrder === "desc"
          ? "sort-button sort-reverse"
          : "sort-button"
      }`}
    >
      ▲
    </button>
  );
}

function SortSelector({ data }: { data: Data }) {
  const [sortKey, setSortKey] = useState<SortKeys>("ZIP");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");

  const headers: { key: SortKeys; label: string }[] = [
    { key: "index", label: "id" },
    { key: "SiteName", label: "Site" },
    { key: "Address", label: "Address" },
    { key: "City", label: "City" },
    { key: "County", label: "County" },
    { key: "ZIP", label: "Zip" },
    { key: "site_type", label: "Type" },
  ];

  const sortedData = useCallback(
    () => sortData({ tableData: data, sortKey, reverse: sortOrder === "desc" }),
    [data, sortKey, sortOrder]
  );

  function changeSort(key: SortKeys) {
    setSortOrder(sortOrder === "ascn" || sortKey !== key ? "desc" : "ascn");

    setSortKey(key);
  }

  return (
    <table>
      <thead>
        <tr>
          {headers.map((row) => {
            return (
              <td key={row.key}>
                {row.label}{" "}
                <SortButton
                  columnKey={row.key}
                  onClick={() => changeSort(row.key)}
                  {...{
                    sortOrder,
                    sortKey,
                  }}
                />
              </td>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {sortedData().map((location) => {
          return (
            <tr key={location.ZIP}>
              <td>{location.index}</td>
              <td>{location.SiteName}</td>
              <td>{location.Address}</td>
              <td>{location.City}</td>
              <td>{location.County}</td>
              <td>{location.ZIP}</td>
              <td>{location.site_type}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default SortSelector;
