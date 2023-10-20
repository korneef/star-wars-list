import React, { ReactNode } from 'react';
import { nanoid } from '@reduxjs/toolkit';

interface Props {
  cells: Array<ReactNode | string>
}

function TableRow({cells}: Props) {
  return (
    <tr>
      {cells.map(item => <td key={nanoid()} className={'table__cell'}>{item}</td>)}
    </tr>
  );
}

export default TableRow;
