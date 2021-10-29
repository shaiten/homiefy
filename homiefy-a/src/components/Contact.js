import React, { createRef, useEffect, useRef, useState } from "react";
import { supabase } from "../supabaseClient";

const Contact = (props) => {
	const [cName, setCName] = useState();
	const [subject, setSubject] = useState();
	const [message, setMessage] = useState();
	const [email, setEmail] = useState();

	const [submitted, setSubmitted] = useState(false);

	const handleSendMessage = async () => {
		const contact = { cName, subject, email, message };
		const response = await supabase.from("contact").insert(contact).single();

		if (response.error) alert("Some error occurred.");
		else setSubmitted(true);
	};

	return (
		<div class="row justify-content-center mt-3">
			<div class="col-lg-10">
				<div
					style={{
						backgroundImage:
							"url(https://preview.colorlib.com/theme/bootstrap/contact-form-08/images/ximg.jpg.pagespeed.ic.y-LWuYha7u.webp)",
						width: "100%",
						overflow: "hidden",
						borderRadius: 5,
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center center",
					}}
				>
					<div class="row">
						<div class="col-md-9 col-lg-7">
							<div class="contact-wrap w-100 p-md-5 p-4">
								<h3 class="mb-4">Get in touch with us</h3>
								<div id="form-message-warning" class="mb-4"></div>
								{submitted && (
									<div id="form-message-success" class="mb-4">
										Your message was sent, thank you!
									</div>
								)}
								<form
									method="POST"
									id="contactForm"
									name="contactForm"
									novalidate="novalidate"
								>
									<div class="row">
										<div class="col-md-12 mb-2">
											<div class="form-group">
												<input
													type="text"
													class="form-control"
													name="name"
													id="name"
													placeholder="Name"
													value={cName}
													onChange={(e) => setCName(e.target.value)}
												/>
											</div>
										</div>
										<div class="col-md-12 mb-2">
											<div class="form-group">
												<input
													type="email"
													class="form-control"
													name="email"
													id="email"
													placeholder="Email"
													value={email}
													onChange={(e) => setEmail(e.target.value)}
												/>
											</div>
										</div>
										<div class="col-md-12 mb-2">
											<div class="form-group">
												<input
													type="text"
													class="form-control"
													name="subject"
													id="subject"
													placeholder="Subject"
													value={subject}
													onChange={(e) => setSubject(e.target.value)}
												/>
											</div>
										</div>
										<div class="col-md-12 mb-2">
											<div class="form-group">
												<textarea
													name="message"
													class="form-control"
													id="message"
													cols="30"
													rows="5"
													placeholder="Message"
													value={message}
													onChange={(e) => setMessage(e.target.value)}
												></textarea>
											</div>
										</div>
										<div class="col-md-12">
											<button
												type="button"
												onClick={(e) => {
													e.preventDefault();
													handleSendMessage();
												}}
												className="btn btn-primary"
												data-bs-dismiss="modal"
											>
												Send Message
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
