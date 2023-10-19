import React from 'react';
import './Table.scss';
import { nanoid } from '@reduxjs/toolkit';

interface Props {
  headerCellsNames: Array<string>;
  rows: Array<React.ReactNode>
}

function Table({headerCellsNames, rows}: Props) {

  const className = 'table'
  return (
    <table className={ className }>
      <thead>
      <tr>
        { headerCellsNames.map(item => <th
          key={ nanoid() }
          className={ `${ className }__cell ${ className }__cell_header` }
        >
          { item }
        </th>) }
      </tr>
      </thead>
      <tbody>
      { rows.map(item => item) }
      </tbody>
    </table>
  );
}

export default Table;
