import React from 'react';
import {Icon, SelectItem} from '@ui-kitten/components';

export const SearchIcon = (style) => <Icon {...style} name="search" />;
export const CalendarIcon = (props) => <Icon {...props} name="calendar" />;

export const BackIcon = (props) => <Icon {...props} name="arrow-ios-back" />;
export const NextIcon = (props) => <Icon {...props} name="arrow-ios-forward" />;

export const FileIcon = (props) => <Icon {...props} name="file" />;

export const MenuIcon = (props) => <Icon {...props} name="menu" />;
export const BackNavIcon = (props) => <Icon {...props} name="arrow-back" />;

export const RecibidoIcon = (props) => (
  <Icon {...props} name="arrow-circle-down" />
);

export const EmitidoIcon = (props) => (
  <Icon {...props} name="arrow-circle-up" />
);

export const RefreshIcon = (props) => <Icon {...props} name="refresh" />;

export const renderOption = (title, index) => (
  <SelectItem key={index} title={title} />
);

export const SaveIcon = (props) => <Icon {...props} name="save" />;
