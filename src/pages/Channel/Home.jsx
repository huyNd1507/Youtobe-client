import React from "react";
import { parseISO, format, isValid } from "date-fns";

const Home = ({ name, createdAt }) => {
  const parsedDate = parseISO(createdAt);

  if (!isValid(parsedDate)) {
    return <div>Thời gian không hợp lệ</div>;
  }

  const formattedDate = format(parsedDate, "dd/MM/yyyy HH:mm:ss");
  return (
    <div>
      <p>
        <strong>Tên kênh: </strong> {name}
      </p>
      <p>
        <strong>Đã tham gia: </strong>
        {formattedDate}
      </p>
    </div>
  );
};

export default Home;
