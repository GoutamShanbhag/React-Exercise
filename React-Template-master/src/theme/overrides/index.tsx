import { merge } from 'lodash';
import { Components, Theme } from '@mui/material';
import { InputBase } from './InputBase';
import { TypographyStyle } from './Typography';
import { ButtonStyle } from './Button';

export function ComponentsOverrides(theme: Theme): Components {
    // Material UI component overrides
    // The components theat need to be overriden has to be put in its own file and imported here.
    return merge(InputBase(theme), TypographyStyle(theme), ButtonStyle(theme));
}
