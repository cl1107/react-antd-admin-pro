import { SearchOutlined } from '@ant-design/icons';
import type { AutoCompleteProps } from 'antd';
import { AutoComplete } from 'antd';
import clsx from 'clsx';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import { useRef, useState } from 'react';
import styles from './index.module.less';

export type HeaderSearchProps = {
  onSearch?: (value?: string) => void;
  onChange?: (value?: string) => void;
  onVisibleChange?: (b: boolean) => void;
  onSelect?: (value: any) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  className?: string;
  placeholder?: string;
  options: AutoCompleteProps['options'];
  defaultOpen?: boolean;
  open?: boolean;
  value?: string;
};

const HeaderSearch: React.FC<HeaderSearchProps> = (props) => {
  const { className, onVisibleChange, placeholder, open, defaultOpen, ...restProps } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState('');

  const [searchMode, setSearchMode] = useMergedState(defaultOpen ?? false, {
    value: open,
    onChange: onVisibleChange,
  });

  const inputClass = clsx(styles.input, {
    [styles.show]: searchMode,
  });

  return (
    <div
      className={clsx(className, styles.headerSearch)}
      onClick={() => {
        setSearchMode(true);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
      onTransitionEnd={({ propertyName }) => {
        if (propertyName === 'width' && !searchMode) {
          if (onVisibleChange) {
            onVisibleChange(searchMode);
          }
        }
      }}
    >
      <SearchOutlined
        key="Icon"
        style={{
          cursor: 'pointer',
          fontSize: 16,
        }}
      />

      <AutoComplete
        ref={inputRef}
        key="AutoComplete"
        className={inputClass}
        value={value}
        allowClear
        placeholder={placeholder}
        options={restProps.options}
        // onChange={setValue}
        onSelect={(valueParams, options) => {
          if (restProps.onSelect) {
            restProps.onSelect(options);
          }
        }}
        onChange={(valueParams) => {
          setValue(valueParams);
          if (restProps.onSearch) {
            restProps.onSearch(valueParams);
          }
        }}
        onBlur={() => {
          setSearchMode(false);
          setValue('');
          if (restProps.onBlur) {
            restProps.onBlur();
          }
        }}
        onFocus={restProps.onFocus}
      />
    </div>
  );
};

export default HeaderSearch;
