import React, { Fragment } from 'react';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Folder from '@material-ui/icons/Folder';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import classname from 'classnames';
import { defaultGreyLight2 } from '../colors';
import { breadcrumb } from '../Menu/AppBar/AppBar';

const useStyles = makeStyles(({ palette, spacing }) => ({
  marginLeft: {
    marginLeft: `${spacing.unit / 2}px !important`,
  },
  breadcrumb: { display: 'flex !important' },
  link: {
    color: `black !important`,
  },
  noMarginLeft: {
    marginLeft: '0px !important',
  },
  separator: {
    color: defaultGreyLight2,
  },
  flex: { display: 'flex', '& > :last-child': { marginLeft: spacing.unit } },
}));

export const FolderBreadcrumb = ({ breadcrumbs }) => {
  const classes = useStyles();
  return (
    <Breadcrumbs
      classes={{ root: classes.breadcrumb }}
      separator={
        <NavigateNextIcon fontSize="small" className={classes.separator} />
      }
      arial-label="Breadcrumb"
    >
      {breadcrumbs.map(current => {
        const isLink = typeof current === 'object';
        const key = isLink ? current.title : current;
        const BodyContent = (
          <Fragment>
            <Folder fontSize="small" className={classes.separator} />
            <Typography
              key={current}
              variant="subtitle2"
              color="textSecondary"
              classes={{ root: classes.link }}
            >
              {key}
            </Typography>
          </Fragment>
        );
        return (
          <div key={key} className={classes.flex}>
            {isLink ? (
              <Link
                key={current.title}
                component={current.component}
                variant="subtitle2"
                classes={{
                  root: classname(
                    classes.link,
                    classes.flex,
                    classes.noMarginLeft
                  ),
                }}
                {...current.componentProps}
              >
                {BodyContent}
              </Link>
            ) : (
              BodyContent
            )}
          </div>
        );
      })}
      ;
    </Breadcrumbs>
  );
};

FolderBreadcrumb.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, breadcrumb])
  ).isRequired,
};