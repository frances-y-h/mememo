const AboutMe = () => {
	return (
		<div className="container-ctr">
			<div className="form-control">
				<div className="about-wrapper">
					<img
						className="frances-img"
						src="/images/Frances_500_500.png"
						alt="Frances (Huang) Lau"
					/>
					<div className="frances-name">Frances (Huang) Lau</div>
					<div className="frances-slogan">
						Love crafting things from scratch.
					</div>
					<div className="about-logo-wrap">
						<a href="https://github.com/frances-y-h" target="_blank">
							<img
								className="about-logo"
								src="/images/git-logo.png"
								alt="Github"
							/>
						</a>
						<a
							href="https://www.linkedin.com/in/frances-huang-660607156"
							target="_blank"
						>
							<img
								className="about-logo"
								src="/images/linkedin-logo.png"
								alt="Linkedin"
							/>
						</a>
					</div>
				</div>
				<div className="about-divider"></div>
				<div className="about-wrapper">
					<div className="about-resources">Resource Used</div>
					<div className="about-resource">
						<div className="about-resource-title">Honeycomb background</div>
						<a
							className="about-resource-link"
							href="http://www.freepik.com"
							target="_blank"
						>
							Designed by designertale / Freepik
						</a>
					</div>
					<div className="about-resource">
						<div className="about-resource-title">Laptop Image</div>
						<a
							className="about-resource-link"
							href="http://www.freepik.com"
							target="_blank"
						>
							Designed by svstudioart / Freepik
						</a>
					</div>
					<div className="about-resource">
						<div className="about-resource-title">Desktop Image</div>
						<a
							className="about-resource-link"
							href="https://www.pexels.com/photo/black-ball-point-pen-with-brown-spiral-notebook-733852/"
							target="_blank"
						>
							Photo by Tirachard Kumtanom / Pexels
						</a>
					</div>
					<div className="about-resource">
						<div className="about-resource-title">NPM Package - Date-fns</div>
						<a
							className="about-resource-link"
							href="https://date-fns.org/"
							target="_blank"
						>
							date-fns provides comprehensive, yet simple and consistent toolset
							for JavaScript dates
						</a>
					</div>
					<div className="about-resource">
						<div className="about-resource-title">NPM Package - Quill Js</div>
						<a
							className="about-resource-link"
							href="https://quilljs.com/"
							target="_blank"
						>
							Your powerful rich text editor.
						</a>
					</div>
					<div className="about-resource">
						<div className="about-resource-title">NPM Package - React DnD</div>
						<a
							className="about-resource-link"
							href="https://react-dnd.github.io/react-dnd/about"
							target="_blank"
						>
							Drag and Drop for React
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutMe;
