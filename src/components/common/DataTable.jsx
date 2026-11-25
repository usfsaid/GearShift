import { useMemo } from "react";
import { useSelector } from "react-redux";
import useContextMenu from "@/hooks/useContextMenu";
import { selectSearchTerm } from "@/app/uiSlice";
import { matchesSearch } from "@/utils/search";
import ContextMenu from "./ContextMenu";

export default function DataTable({
  columns,
  rows,
  rowKey,
  getActions,
  loading = false,
}) {
  const term = useSelector(selectSearchTerm);
  const { menu, open, close } = useContextMenu();

  const visibleRows = useMemo(
    () => rows.filter((row) => matchesSearch(row, term)),
    [rows, term],
  );
  const colSpan = columns.length + (getActions ? 1 : 0);

  return (
    <div className="table-responsive">
      {/* Table */}
      <table className="table table-hover align-middle mb-0">
        {/* thead */}
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.header}</th>
            ))}
            {getActions && <th>Actions</th>}
          </tr>
        </thead>

        {/* tbody */}
        <tbody>
          {visibleRows.map((row) => (
            // row
            <tr
              key={row[rowKey]}
              onContextMenu={
                getActions ? (e) => open(e, getActions(row)) : undefined
              }
            >
              {/* data  */}
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}

              {/* btn Actions */}
              {getActions && (
                <td>
                  <button
                    type="button"
                    className="btn btn-link btn-sm p-0 text-warning fw-bold text-decoration-none"
                    onClick={(e) => open(e, getActions(row))}
                  >
                    Actions
                  </button>
                </td>
              )}
            </tr>
          ))}

          {/* if not there data */}
          {!visibleRows.length && (
            <tr>
              <td colSpan={colSpan} className="text-center text-secondary py-4">
                {loading ? "Loading..." : "No records found"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <ContextMenu menu={menu} onClose={close} />
    </div>
  );
}
