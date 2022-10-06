import dayjs from "dayjs";

const day = () => {
  return dayjs().format("YYYY-MM-DD HH:mm:ss");
};

export default day;
