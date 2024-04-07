import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import checkIfMobileDevice from "../../../utils/checkIfMobileDevice";
import PropTypes from "prop-types";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "./MobileSidebar.css";

function MobileSidebar({ className, showSidebar, setShowSidebar, showCollapese = true, children }) {
	const isMobileDevice = checkIfMobileDevice();

	if (isMobileDevice) showCollapese = true;

	return (
		<div
			className={`mobileSidebar${isMobileDevice ? " mobileSidebar--mobile" : ""}${
				showSidebar ? " mobileSidebar--show" : ""
			}${className ? ` ${className}` : ""}`}>
			{showCollapese && (
				<div
					className="mobileSidebar__collapse"
					title={`${showSidebar ? "Hide" : "Show"} sidebar`}
					onClick={() => setShowSidebar((prev) => !prev)}>
					<FontAwesomeIcon icon={faAngleLeft} />
				</div>
			)}

			{children}
		</div>
	);
}

MobileSidebar.propTypes = {
	className: PropTypes.string,
	showSidebar: PropTypes.bool.isRequired,
	setShowSidebar: PropTypes.func.isRequired,
	showCollapese: PropTypes.bool,
	children: PropTypes.node.isRequired,
};

export default MobileSidebar;
