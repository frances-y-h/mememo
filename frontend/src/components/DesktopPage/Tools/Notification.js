import { useNotification } from "../../../context/NotificationContext";

const Notification = () => {
	const { toggleNotification, notificationMsg } = useNotification();
	return (
		<div className={`notification-div ${toggleNotification}`}>
			<i className="fa-solid fa-floppy-disk"></i>
			{notificationMsg}
		</div>
	);
};

export default Notification;
