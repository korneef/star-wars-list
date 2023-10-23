import React, { useEffect, useState } from 'react';
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

  const [wasClicked, setWasClicked] = useState<boolean>(false);

  useEffect(() => {
    if (!disabled) setWasClicked(false);
  }, [disabled])

  const handleClick = () => {
    setWasClicked(true);
    onClick();
  }

  const className = 'button'

  return (
    <button
      onClick={ handleClick }
      className={ cn(
        className,
        {[`${ bemClass }__${ className }`]: bemClass},
        {[`${ className }_disabled`]: disabled},
        {[`${ className }_loading`]: disabled && wasClicked}

      ) }
      disabled={ disabled }
    >{ children }
      {
        disabled && wasClicked && <div className={ `${ className }__loader-wrapper` }><span className={ `${ className }__loader` }></span></div>
      }
    </button>
  );
}

export default Button;
