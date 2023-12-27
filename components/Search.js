import React from "react";
import ListScreen from "./HymnListScreen";
import { ContentData } from "./names";

export const Filter = ({ name, navigation }) => {
  let data = FilterHelper(name);
  return <ListScreen data={data} navigation={navigation} />;
};

export const FilterHelper = (name) => {
  let list;
  if (parseInt(name)) {
    list = ContentData.filter((e) => e.key.includes(name));
  } else if (!parseInt(name)) {
    list = ContentData.filter((e) =>
      e.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    );
  }
  return list;
};