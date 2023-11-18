import React, { useState, useEffect } from 'react';
import {Root, CustomTablePagination} from './CitiesTable.styled';
import {FilterRow} from './FilterRow'

const POPULATION_TRESHOLD = 1000000;

const tableHeaders = ['name','area', 'population', 'density'];

const renderLabels = (labels, sortFunc) => {
  return(
    <tr>
      {labels.map(i => <th key={i} onClick={(e) => sortFunc(e)}>{i}</th>)}
    </tr>
  )
}

const renderRow = (item) => {
  // set up blue(material UI) and white, because this combination is high contrast and can be read by almost anyone (people with 
  // astigmatizm might have additional blur)
  const rowStyle = item.population > POPULATION_TRESHOLD ? { width: 300, backgroundColor: '#2196F3', color: 'white' } :
  { width: 300 };
  const uid = generateId();

  return (
  <tr key={`${item.name}-${uid}`}>
    <td style={rowStyle} align="right">
      {item.name}
    </td>
    <td style={rowStyle} align="right">
      {item.area}
    </td>
    <td style={rowStyle} align="right">
      {item.population}
    </td>
    <td style={rowStyle} align="right">
      {item.density}
    </td>
  </tr>
  );
}

const generateId = () => `${performance.now()}${Math.random().toString().slice(5)}`.replace('.','')

export const CitiesTable = () => {
  const [citiesList, setCitiesList] = useState([]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newArea, setNewArea] = useState(0);
  const [newPopulation, setNewPopulation] = useState(0);
  const [sendPost, setSendPost] = useState(false);
  // sortOrder === true is ascending
  const [sortOrder, setSortOrder] = useState(true);
  const [sortingField, setSortingField] = useState('');
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetch("http://localhost:8081/cities")
      .then((res) => res.json())
      .then((resData) => setCitiesList(resData?.data));
  }, []);

  useEffect(() => {
    let query = 'http://localhost:8081/cities';
    const filterParam = filter ? `contains=${filter}` : '';
    const sortParam = sortingField ? `sort=${sortingField}&sortOrder=${sortOrder ? 'asc' : 'desc'}` : '';
    if (filterParam || sortParam) {
      query += '?';
      if(filterParam){
        query += filterParam;
      }
      if(filterParam && sortParam){
        query += '&';
      }
      if(sortParam) {
        query += sortParam;
      }
    }
    fetch(query)
      .then((res) => res.json())
      .then((resData) => setCitiesList(resData?.data));
  }, [filter, sortOrder, sortingField]);

  useEffect(() => {
    if(sendPost){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, area: newArea, population: newPopulation })
    };
    fetch('http://localhost:8081/cities', requestOptions)
      .then((res) => res.json())
      .then((resData) => {
        setCitiesList([...citiesList,{...resData?.body}])
      });
    setSendPost(false);
    }
  }, [sendPost, newArea, newName, newPopulation, citiesList]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - citiesList.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (sortKey) => {
    setSortOrder(!sortOrder);
    setSortingField(sortKey.target.textContent);
  }

  return (
    <>
    <FilterRow filter={filter} setFilter={(e) => setFilter(e)} newName={newName} setNewName={(e) => setNewName(e)}
    newArea={newArea} setNewArea={(e) => setNewArea(e)} newPopulation={newPopulation} setNewPopulation={setNewPopulation} 
    sendPost={sendPost} setSendPost={setSendPost}/>
    <Root sx={{ maxWidth: '100%', width: 1000 }}>
      <table aria-label="table with cities, their area and population info">
        <thead>
            {renderLabels(tableHeaders, handleSort)}
        </thead>
        <tbody>
          {(rowsPerPage > 0
            ? citiesList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : citiesList
          ).map((row, i) => (renderRow(row, page, i)))}
          {emptyRows > 0 && (
            <tr style={{ height: 41 * emptyRows }}>
              <td colSpan={4} aria-hidden />
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
              colSpan={4}
              count={citiesList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  'aria-label': 'rows per page',
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
    </Root>
    </>
  );
}
