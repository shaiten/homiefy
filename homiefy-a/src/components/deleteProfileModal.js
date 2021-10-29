import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const DeleteProfileModal = ({ profileDeleteId, setProfileDeleteId }) => {
	const handleDelete = async () => {
		const response = await supabase
			.from("profiles")
			.delete()
			.eq("id", profileDeleteId);

		if (response.error)
			alert("Some Error Occurred When Deleting This Profile.");
		else alert("Profile Successfully Deleted.");
	};

	const signinModal = (
		<div
			className="modal fade"
			id="deleteProfileModal"
			tabIndex="-1"
			aria-labelledby="signInModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="signInModalLabel">
							Delete Profile
						</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						Are You Sure You Want To Delete This Profile
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
							data-bs-dismiss="modal"
							onClick={() => setProfileDeleteId(null)}
						>
							Cancel
						</button>
						<button
							type="button"
							onClick={(e) => {
								e.preventDefault();
								handleDelete();
							}}
							className="btn btn-danger"
							data-bs-dismiss="modal"
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);

	return <div>{signinModal}</div>;
};

export default DeleteProfileModal;
