import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const CustomTable = ({ columns, rows }) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (_, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<div
			style={{
				height: '100%',
				width: '100%',
				position: 'absolute',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<div>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component='div'
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					sx={{
						padding: '0.5rem 1rem',
						color: '#6489d1',
					}}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</div>
			<TableContainer sx={{ flow: 1 }}>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									sx={{
										minWidth: column.minWidth,
										background: '#CBD8F0',
										borderBottom: 'none',
										color: '#6489d1',
										lineHeight: '100%',
										padding: '0.5rem 1rem',
										letterSpacing: 0.01,
										fontFamily: 'Barlow',
										fontSize: '1rem',
									}}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, i) => {
								return (
									<TableRow hover tabIndex={-1} key={i}>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell
													key={column.id}
													align={column.align}
													sx={{
														borderColor: '#CBD8F0',
														background: '#FAFCFE',
														padding: '0.5rem 1rem',
														fontFamily: 'Barlow',
														textTransform: 'capitalize',
													}}
												>
													{value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<div>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component='div'
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					sx={{
						padding: '0.5rem 1rem',
						color: '#6489d1',
					}}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</div>
		</div>
	);
};

export default CustomTable;
