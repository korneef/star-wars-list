import React from 'react';
import cn from 'classnames';
import './Button.scss';

type Props = {
  onClick: () => void,
  children: React.ReactNode,
  bemClass?: string,
  disabled?: boolean
}

function Button(props: Props) {
  const {
    onClick,
    bemClass,
    children,
    disabled = false,
  } = props;
  const className = 'button'

  return (
    <button
      onClick={ onClick }
      className={cn(
        className,
        {[`${bemClass}__${className}`]: bemClass},
        {[`${className}_disabled`]: disabled}
        )}
      disabled={disabled}
    >{ children }
    </button>
  );
}

export default Button;
