import React from "react";

function WebButton({
	id,
	onClick,
	label,
	loading,
	disabled,
	style,
	containerStyle,
	classes,
	type = "button",
}) {
	return (
		<div className="form-group form-button" style={{ ...containerStyle }}>
			<button
				type={type}
				name={id}
				id={id}
				className={`form-submit ${classes}`}
				onClick={onClick}
				disabled={loading || disabled}
				style={{ border: 0, ...style }}
				value={label}
			>
				{label}
				{loading && (
					<div
						className="spinner-border spinner-border-sm ms-3"
						role="status"
					></div>
				)}
			</button>
		</div>
	);
}

export default WebButton;
