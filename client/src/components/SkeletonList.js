import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

const SkeletonList = ({ lines = 3 }) => {
  const List = () => {
    const ret = [];
    for (let i = 0; i < lines; i++) {
      ret.push(
        <Skeleton
          key={i}
          variant="rect"
          width="100%"
          height={30}
          style={{ marginBottom: 8 }}
        />
      );
    }
    return ret;
  };
  return <List />;
};

export default SkeletonList;
