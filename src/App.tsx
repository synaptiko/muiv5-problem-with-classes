import Container from '@mui/material/Container';
import Chip, { chipClasses } from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { makeStyles, withStyles } from 'tss-react/mui';
import { makeStyles as makeStylesWorkaround, withStyles as withStylesWorkaround } from './styles';
import { Typography } from '@mui/material';

const useStylesActual = makeStyles()((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  deleteIcon: {
    color: theme.palette.primary.contrastText,
    '&:hover': {
      color: `${theme.palette.primary.contrastText}6`,
    },
  },
}));

const StyledChipActual = withStyles(Chip, (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  deleteIcon: {
    color: theme.palette.primary.contrastText,
    '&:hover': {
      color: `${theme.palette.primary.contrastText}6`,
    },
  },
}));

const useStylesExpected = makeStyles()((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    [`& .${chipClasses.deleteIcon}`]: {
      color: theme.palette.primary.contrastText,
      '&:hover': {
        color: `${theme.palette.primary.contrastText}6`,
      },
    },
  },
}));

const StyledChipExpected = withStyles(Chip, (theme, _props, classes) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    [`& .${classes.deleteIcon}`]: {
      color: theme.palette.primary.contrastText,
      '&:hover': {
        color: `${theme.palette.primary.contrastText}6`,
      },
    },
  },
}));

const useStylesWorkaround = makeStylesWorkaround()((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  deleteIcon: {
    color: theme.palette.primary.contrastText,
    '&:hover': {
      color: `${theme.palette.primary.contrastText}6`,
    },
  },
}));

const StyledChipWorkaround = withStylesWorkaround(Chip, (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  deleteIcon: {
    color: theme.palette.primary.contrastText,
    '&:hover': {
      color: `${theme.palette.primary.contrastText}6`,
    },
  },
}));

function App() {
  const { classes: classesActual } = useStylesActual();
  const { classes: classesExpected } = useStylesExpected();
  const { classes: classesWorkaround } = useStylesWorkaround();

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Stack direction="column" spacing={1}>
        <Typography variant="h4">Actual</Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="Default chip" onDelete={() => {}} />
          <Chip label="Chip with classes" onDelete={() => {}} classes={classesActual} />
          <StyledChipActual label="Styled chip" onDelete={() => {}} />
        </Stack>
        <Typography variant="h4">Expected</Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="Default chip" onDelete={() => {}} />
          <Chip label="Chip with classes" onDelete={() => {}} classes={classesExpected} />
          <StyledChipExpected label="Styled chip" onDelete={() => {}} />
        </Stack>
        <Typography variant="h4">Workaround</Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="Default chip" onDelete={() => {}} />
          <Chip label="Chip with classes" onDelete={() => {}} classes={classesWorkaround} />
          <StyledChipWorkaround label="Styled chip" onDelete={() => {}} />
        </Stack>
      </Stack>
    </Container>
  );
}

export default App;
