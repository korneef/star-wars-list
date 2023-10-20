import React, { ReactNode } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import './TableRow.scss';

interface Props {
  cells: Array<ReactNode | string>
}

function TableRow({cells}: Props) {
  return (
    <tr className='table__table-row'>
      {cells.map(item => <td key={nanoid()} className={'table__cell'}>{item}</td>)}
    </tr>
  );
}

export default TableRow;
