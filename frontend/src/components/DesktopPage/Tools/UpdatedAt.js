import { formatDistanceToNow, parseISO } from "date-fns";

const UpdatedAt = ({ updatedAt }) => {
	if (updatedAt) {
		return <div>{formatDistanceToNow(parseISO(updatedAt))} ago</div>;
	} else return <div>{new Date().toTimeString()}</div>;
};

export default UpdatedAt;
