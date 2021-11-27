import React from "react";

const Paginate = ({ onPrevPress, onNextPress, currentPage, totalPages }) => {
	return (
		<div className="row m-5">
			<div className="col col display-flex justify-content-start">
				<button
					className="btn btn-primary "
					disabled={currentPage <= 1}
					onClick={onPrevPress}
				>
					Prev
				</button>
			</div>
			<div className="col col display-flex justify-content-center">
				<span>{`${currentPage} / ${totalPages}`}</span>
			</div>
			<div className="col col display-flex justify-content-end">
				<button
					className="btn btn-primary "
					disabled={currentPage >= totalPages}
					onClick={onNextPress}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default Paginate;
