import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FilterIcon from '@material-ui/icons/FilterList';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import AdvancedFilters from './AdvancedFilters';

const onApplyFilter = (setAnchorEl, setFilters) => advancedFilters => {
  setFilters(prevFilters => ({ ...prevFilters, advancedFilters }));
  setAnchorEl(null);
};

const TableAdvancedFilters = ({
  tooltipAdvancedFilter,
  advancedFilters,
  setFilters,
  filters,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  if (!advancedFilters) {
    return null;
  }

  const open = Boolean(anchorEl);
  const { maxHeight = '100%', maxWidth = '700px' } = advancedFilters;

  const maxSizeAdvancedFilters = {
    maxHeight,
    maxWidth,
  };

  return (
    <React.Fragment>
      <Tooltip title={tooltipAdvancedFilter || 'Advanced Filters'}>
        <IconButton onClick={event => setAnchorEl(event.currentTarget)}>
          <FilterIcon />
        </IconButton>
      </Tooltip>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div style={maxSizeAdvancedFilters}>
          <AdvancedFilters
            advancedFilters={advancedFilters}
            tooltipAdvancedFilter={tooltipAdvancedFilter}
            onApplyFilter={onApplyFilter(setAnchorEl, setFilters)}
            setFilters={setFilters}
            filters={filters}
          />
        </div>
      </Popover>
    </React.Fragment>
  );
};

TableAdvancedFilters.defaultProps = {
  tooltipAdvancedFilter: null,
  advancedFilters: null,
};

TableAdvancedFilters.propTypes = {
  tooltipAdvancedFilter: PropTypes.string,
  advancedFilters: PropTypes.shape({
    applyFiltersLabel: PropTypes.string,
    applyFilters: PropTypes.func,
    filtersGroup: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.string,
      })
    ),
    filters: PropTypes.arrayOf(
      PropTypes.shape({
        group: PropTypes.string,
        type: PropTypes.oneOf([
          'input',
          'select',
          'multi-select',
          'date',
          'time',
          'checkbox',
        ]).isRequired,
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(
          PropTypes.shape({
            value: PropTypes.any,
            label: PropTypes.string,
            disabled: PropTypes.bool,
          })
        ),
        value: PropTypes.any,
      })
    ),
  }),
};

export default TableAdvancedFilters;