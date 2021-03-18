import React from "react";
import { useByeQuery } from "../generated/graphql";

interface ByeProps {}

export const Account: React.FC<ByeProps> = () => {
  const {data, loading, error} = useByeQuery({
      fetchPolicy: "network-only"
  });

  if(loading){
      return <div>loading...</div>
  }
  if(error){
      console.log(error);
      return <div>{error.toString()}</div>;
  }
  if(!data){
      return <div>No data...</div>
  }
  return (
    <div>
        {JSON.stringify(data)}
    </div>
  );
};
