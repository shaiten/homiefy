import React from "react";

function WebInput({
	label,
	reference,
	name,
	defaultValue,
	dataList,
	placeholder,
	...otherProps
}) {
	const list = dataList ? `dataList${label || placeholder}` : null;

	return (
		<div className="form-group" style={{ marginTop: 10, marginBottom: 10 }}>
			<label style={{ position: "relative", display: "contents" }}>
				{label}
			</label>
			<input
				type="text"
				className="form-control"
				name={name}
				style={{ marginTop: 10 }}
				ref={reference}
				defaultValue={defaultValue}
				list={list}
				placeholder={placeholder}
				{...otherProps}
			/>
			{dataList && (
				<datalist id={list}>
					{dataList.map((i, index) => (
						<option value={i} key={index} />
					))}
				</datalist>
			)}
		</div>
	);
}

export default WebInput;
